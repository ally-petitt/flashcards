import React, { useState } from "react";
import axios from "axios";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const [deckData, setDeckData] = useState({
    title: "",
    description: "",
    color: "#ffffff",
    isStarred: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deckData.title.trim() === "") {
      document.getElementById("required-message").classList.remove("d-none");
      document.getElementById("required-message").classList.add("d-block");
      return false;
    }

    document.getElementById("form").reset();
    document.getElementById("required-message").classList.add("d-none");
    document.getElementById("required-message").classList.remove("d-block");

    const newDeck = {
      deck_info: {
        title: deckData.title,
        description: deckData.description,
        color: deckData.color,
      },
    };

    // send post request
    axios.post("http://localhost:5000/decks/create", newDeck).then(
      (res) => console.log(res.data),
      (err) => console.log(err)
    );
    // reset state
    setDeckData({
      title: "",
      description: "",
      color: "#ffffff",
    });
  };

  return (
    <DeckForm
      handleSubmit={handleSubmit}
      title="CREATE A NEW DECK"
      buttonText="Create Deck"
      state={deckData}
      setState={setDeckData}
    />
  );
}

export default CreateDeck;
