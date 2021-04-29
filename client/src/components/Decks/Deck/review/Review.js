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

  const setNextCardId = () => {
    let nextCardId;
    if (firstUpdate) {
      console.log("first update")
      nextCardId = chooseCard(remainingCards);
    } else {
      nextCardId = chooseCard(currentCards.remainingCards)
    }
    return nextCardId
  }

  const resetState = (nextCard, nextCardIndex) => {
    if(firstUpdate) {
      setCurrentCards({
        card_info: nextCard.card_info, 
        remainingCards: remainingCards,
      })
      console.log("first update list: ")
      console.log(currentCards)
      setFirstUpdate(false)
    } else {
       setCurrentCards({
        ...currentCards,
        card_info: nextCard.card_info,
      });
    }

    currentCards.remainingCards.splice(nextCardIndex, 1);
  }

  const updateCard = async () => {
    const nextCardId = setNextCardId();
    const nextCardIndex = remainingCards.indexOf(nextCardId);
    let nextCard;
    console.log("Update");

    if ((firstUpdate && remainingCards.length > 0) || (currentCards.remainingCards.length > 0)) {
      console.log("get");
      console.log("deck_id: " + deck_id)
      console.log("nextCardId: " + nextCardId)
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
    <>
      <Link to={`/deck/view/${deck_id}`} style={{ marginLeft: "22px" }}>
        <ChevronLeftIcon
          fontSize="large"
          style={{ color: "white", marginLeft: "10px" }}
        />
      </Link>
      <div
        className="container d-flex justify-content-center align-items-center position-absolute flex-column text-center text-light"
        style={{
          height: "100vh",
          width: "100vw",
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
    </>
  );
}

export default Review;
