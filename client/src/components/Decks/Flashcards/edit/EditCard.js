import axios from "axios";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import Form from "./Form";

function EditCard() {
  const history = useHistory();
  const { deck_id, card_id } = useParams();

  const [cardData, setCardData] = useState({
        front: "",
        back: ""
    });

    const [wasSuccessful, setWasSuccessful] = useState()

    const storeData = async () => {
        const updatedCard = {
          card_info:{
            front: cardData.front,
            back: cardData.back
          }
        };

        // send post request
        const result = await axios.post(`http://localhost:4000/decks/${deck_id}/cards/update/${card_id}`, updatedCard)
          .then((res) => setWasSuccessful(true))
          .catch((err) =>setWasSuccessful(false)
        );

        history.push(`/deck/view/${deck_id}`)
    }

  return (
    <div>
      <Form title="EDIT YOUR CARD" btnText="Edit Card" deckId={deck_id} storeData={storeData} state={cardData} setState={setCardData} wasSuccessful={wasSuccessful} />
    </div>
  );
}

export default EditCard;
