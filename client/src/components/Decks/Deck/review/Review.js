import { Link } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Review() {
  let remainingCards = [];
  const [currentCards, setCurrentCards] = useState({
    card_info: {
      front: "",
      back: "",
    },
    // store remaining cards so that array isn't undefined when component rerenders
    remainingCards: [],
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [firstUpdate, setFirstUpdate] = useState(true)

  const { deck_id } = useParams();

  useEffect(async () => {
    const result = await axios
      .get(`http://localhost:4000/decks/${deck_id}`)
      .then((res) => {
        remainingCards = res.data.cards;
      });

    updateCard();
  }, []);

  const chooseCard = (arr) => {
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
  };

  const resetState = (nextCard, nextCardIndex) => {
    console.log(currentCards)
    if(firstUpdate) {
      console.log("first update")
      setCurrentCards({
        card_info: nextCard.card_info, 
        remainingCards: remainingCards,
      })
      setFirstUpdate(false)
    } else {
       setCurrentCards({
        card_info: nextCard.card_info,
        remainingCards: currentCards.remainingCards
      });
    }

    currentCards.remainingCards.splice(nextCardIndex, 1);
  }

  const updateCard = async () => {
    console.log(currentCards)
    if (firstUpdate && remainingCards.length > 0) {
      console.log("first update")
      setCurrentCards({
        ...currentCards, 
        remainingCards: remainingCards,
      })
    }
    console.log(currentCards.remainingCards == remainingCards)

    const nextCardId = chooseCard(currentCards.remainingCards)
    const nextCardIndex = currentCards.remainingCards.indexOf(nextCardId);
    let nextCard;

    console.log("nextCardId: " + nextCardId)

    if (currentCards.remainingCards.length > 0) {
      const result = await axios
        .get(`http://localhost:4000/decks/${deck_id}/cards/${nextCardId}`)
        .then((res) => {
          nextCard = res.data;
        });

      resetState(nextCard, nextCardIndex)
      console.log(currentCards);
    }
  };

  return (
    <div className="review position-relative" style={{height: "100vh",width: "100%"}}>
      <a href={`/deck/view/${deck_id}`} style={{ marginLeft: "22px", position: "absolute", zIndex: 1000}}>
        <ChevronLeftIcon
          fontSize="large"
          style={{ color: "white", marginLeft: "10px" }}
        />
      </a>
      <div
        className="container d-flex justify-content-center align-items-center position-absolute flex-column text-center text-light"
        style={{
          bottom: "0",
          top: "0",
          left: "0",
          right: "0",
        }}
      >
        <p className="h2">
          {isFlipped
            ? currentCards.card_info.back
            : currentCards.card_info.front}
        </p>
        <button
          className="btn btn-outline-light mt-4"
          onClick={() => {
            setIsFlipped(!isFlipped);
          }}
        >
          Flip
        </button>
        <button className="btn btn-outline-success mt-4" onClick={updateCard}>
          Next Card
        </button>
      </div>
    </div>
  );
}

export default Review;
