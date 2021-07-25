import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

function Review() {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState({
    card_info: {
      front: "",
      back: ""
    }
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const { deck_id } = useParams();

  useEffect(async () => {
    await axios
      .get(`http://localhost:4000/decks/view-cards/${deck_id}`)
      .then((res) => {
        setCards(shuffle(res.data));
      });
  }, []);

  useEffect(() => {
    if (cards != []) {
      updateCard();
    }
  }, [cards])

  const shuffle = (arr) => {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

  const updateCard = () => {
    if (cards.length >= 1 ) {
      setCurrentCard(cards[0]);
      cards.shift()
      setCards(cards);
    }
  }

  return (
    <div className="review position-relative" style={{height: "100vh",width: "100%"}}>
      <Link to={`/deck/view/${deck_id}`} style={{ marginLeft: "22px", position: "absolute", zIndex: 1000}}>
        <ChevronLeftIcon
          fontSize="large"
          style={{ color: "white", marginLeft: "10px" }}
        />
      </Link>
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
            ? currentCard.card_info.back
            : currentCard.card_info.front}
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
