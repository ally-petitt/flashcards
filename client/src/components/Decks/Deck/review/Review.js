import { Link } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

function Review() {
  const [currentCard, setCurrentCard] = useState({
    card_info: {
      front: "",
      back: "",
    },
  });
  let remainingCards = [];

  const { id } = useParams();

  useEffect(async () => {
    const result = await axios
      .get(`http://localhost:4000/decks/${id}`)
      .then((res) => {
        remainingCards = res.data.cards;
      });

    updateCard();
  }, []);

  const chooseCard = (arr) => {
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
  };

  const updateCard = async () => {
    const nextCardId = chooseCard(remainingCards);
    let nextCard;

    let result = await axios
      .get(`http://localhost:4000/decks/${id}/cards/${nextCardId}`)
      .then((res) => {
        nextCard = res.data;
      });

    setCurrentCard(nextCard);
  };

  return (
    <>
      <Link
        to={`/deck/view/${id}`}
        style={{ color: "white", marginLeft: "22px" }}
      >
        <ChevronLeftIcon fontSize="large" />
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
        <p className="h2">{currentCard.card_info.front}</p>
        <button className="btn btn-outline-light mt-4">Flip</button>
        <button className="btn btn-outline-success mt-4">Next Card</button>
      </div>
    </>
  );
}

export default Review;
