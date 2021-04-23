import React, { useState } from 'react';
import axios from "axios";
import Form from "./Form"

function CreateCard() {
    const [cardData, setCardData] = useState({
    title: "",
    description: "",
    color: "#ffffff",
    isStarred: false,
  });

  const [wasSuccessful, setWasSuccessful] = useState()

    let deckId = 17

    const storeData = () => {
        const newDeck = {
      deck_info: {
        title: cardData.title,
        description: cardData.description,
        color: cardData.color,
      },
    };

    // send post request
    axios.post("http://localhost:4000/decks/create", newDeck).then(
      (res) => setWasSuccessful(true))
      .catch((err) =>setWasSuccessful(false)
    );
    // reset state
    setCardData({ 
      title: "",
      description: "",
      color: "#ffffff",
    });
    }
    return (
        <div>
            <Form title="CREATE A NEW CARD" btnText="Create Card" deckId={deckId} storeData={storeData} state={cardData} setState={setCardData} wasSuccessful={wasSuccessful} />
        </div>
    )
}

export default CreateCard
