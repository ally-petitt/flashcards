import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";

import Deck from "./Deck";

function Decks() {
  const [decks, setDecks] = useState({ decks: [] });

  //retrieve decks from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((res) => {
        setDecks({ decks: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="p-3 d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <Link
            to="/deck/create"
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
          >
            <div
              className="d-flex justify-content-center align-items-center bg-light rounded"
              style={{ height: "200px" }}
            >
              <AddIcon fontSize="large" style={{ fill: "black" }}></AddIcon>
            </div>
          </Link>
          {decks.decks.map((deck, i) => (
            <Deck
              id={deck._id}
              title={deck.deck_info.title}
              color={deck.deck_info.color}
              key={i}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Decks;
