import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import Flashcard from "./Flashcard";

function Flashcards() {
  const [cards, setCards] = useState([])
  let {id} = useParams();

  //retrieve cards from the database
  useEffect(() => {
    axios
      .get(`http://localhost:4000/decks/view-cards/${id}`)
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-center text-light">Flashcards</h1>
      <div className="p-3 d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <Link
            to="/deck/:deck_id/card/create"
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
          >
            <div
              className="d-flex justify-content-center align-items-center bg-light rounded"
              style={{ height: "200px" }}
            >
              <AddIcon fontSize="large" style={{ fill: "black" }}></AddIcon>
            </div>
          </Link>
          {cards.map((card, i) => (
            <Flashcard front={card.card_info.front} back={card.card_info.back} deckId={id} cardId={card._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Flashcards;
