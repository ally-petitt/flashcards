import { Link } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Review() {
  let remainingCards = [];
  const [currentCard, setCurrentCard] = useState({
    card_info: {
      front: "",
      back: "",
    },
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const { id } = useParams();

  useEffect(async () => {
    const result = await axios
      .get(`http://localhost:4000/decks/${id}`)
      .then((res) => {
        remainingCards = res.data.cards;
      });

    updateCard();
  }, []);

  const chooseCard = () => {
    let i = Math.floor(Math.random() * remainingCards.length);
    return { id: remainingCards[i], index: i };
  };

  const updateCard = async () => {
    const nextCardId = chooseCard().id;
    const nextCardIndex = chooseCard().index;
    let nextCard;
    console.log(nextCardId);
    console.log(remainingCards);

    if (remainingCards.length > 0) {
      const result = await axios
        .get(`http://localhost:4000/decks/${id}/cards/${nextCardId}`)
        .then((res) => {
          nextCard = res.data;
        });
      remainingCards.splice(nextCardIndex, 1);
      setCurrentCard(nextCard);
    }
  };

  return (
    <>
      <Link to={`/deck/view/${id}`} style={{ marginLeft: "22px" }}>
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
          {isFlipped ? currentCard.card_info.back : currentCard.card_info.front}
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
