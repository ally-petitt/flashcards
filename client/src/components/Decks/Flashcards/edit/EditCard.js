import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Form from "./Form";

function EditCard() {
  const history = useHistory();
  const { deck_id, card_id } = useParams();

  const [cardInfo, setCardInfo] = useState({
    card_info: {
      front: "",
      back: ""
    }
  });

  const [wasSuccessful, setWasSuccessful] = useState()

  useEffect( async() => {
    const result = await axios
      .get(`http://localhost:4000/decks/${deck_id}/cards/${card_id}`)
      .then((res) => {setCardInfo({card_info: res.data.card_info}); console.log(res.data.card_info)})
  }, [])

  const storeData = async() => {
  // send post request
  const result = await axios.post(`http://localhost:4000/decks/${deck_id}/cards/update/${card_id}`, cardInfo)
    .then((res) => setWasSuccessful(true))
    .catch((err) =>setWasSuccessful(false)
  );
    history.push(`/deck/view/${deck_id}`)
  }

  return (
    <div>
      <Form 
        title="EDIT YOUR CARD" 
        btnText="Edit Card" 
        deckId={deck_id} 
        storeData={storeData} 
        state={cardInfo} 
        setState={setCardInfo} 
        wasSuccessful={wasSuccessful}
        front={cardInfo.card_info.front}
        back={cardInfo.card_info.back} />
    </div>
  );
}

export default EditCard;
