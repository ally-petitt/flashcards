import React, { useState } from "react";
import axios from "axios";
import Form from "./Form";
import { useParams } from "react-router";

function CreateCard() {
  const [cardInfo, setCardInfo] = useState({
    card_info: {
      front: "",
      back: "",
    },
  });

  const [wasSuccessful, setWasSuccessful] = useState();

  const { deck_id } = useParams();

  const storeData = async () => {
    const newCard = {
      front: cardInfo.card_info.front,
      back: cardInfo.card_info.back,
    };

    // send post request
    const result = await axios
      .post(`http://localhost:4000/decks/${deck_id}/cards/create`, newCard)
      .then((res) => setWasSuccessful(true))
      .catch((err) => setWasSuccessful(false));
  };

  const text = {
    title: "CREATE YOUR CARD",
    submitBtn: "Create Card",
    success: "Created Successfully",
    back: cardInfo.card_info.back,
    front: cardInfo.card_info.front,
    fail: "Could not create card at this time",
    showDelete: false,
  };

  return (
    <div>
      <Form
        text={text}
        deckId={deck_id}
        storeData={storeData}
        state={cardInfo}
        setState={setCardInfo}
        wasSuccessful={wasSuccessful}
      />
    </div>
  );
}

export default CreateCard;
