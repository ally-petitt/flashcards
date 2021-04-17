import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import DeckForm from "./DeckForm";

function EditDeck() {
  const [deck, setDeck] = useState({
    deck_info: {
      title: "",
      description: "",
      color: "",
    },
  });

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/decks/${id}`)
      .then((res) => {
        setDeck({
          deck_info: res.data.deck_info,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = () => {};

  return (
    <DeckForm
      title="EDIT YOUR DECK"
      buttonText="Save"
      state={deck}
      setState={setDeck}
      handleSubmit={handleSubmit}
      deckDesc={deck.deck_info.description}
      deckTitle={deck.deck_info.title}
    />
  );
}

export default EditDeck;
