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
      .then((res) => {
        setCardInfo({card_info: res.data.card_info })
      })
  }, [])

  const storeData = async() => {
    // send post request
    const result = await axios.post(`http://localhost:4000/decks/${deck_id}/cards/update/${card_id}`, cardInfo)
      .then((res) => setWasSuccessful(true))
      .catch((err) =>setWasSuccessful(false)
    );
      history.push(`/deck/view/${deck_id}`)
  }

  const handleDelete = () => {
    // confirm that they would like to delete
    if (window.confirm("Are you sure you want to delete this deck?")) {

      // remove buttons
      const buttons = document.getElementsByClassName("btn");
      for (const button of buttons) {
        button.classList.add("d-none");
      }

      axios
        .delete(`http://localhost:4000/decks/${deck_id}/cards/delete/${card_id}`)
        .then((res) => {
                // show that card was deleted
          document.getElementById("after-delete").classList.remove("d-none");
          document.getElementById("after-delete").classList.add("d-block");
          document.getElementById("delete-notif").classList.add("d-flex");
        })
        .catch((err) => {
          text.delete = "Card could not be deleted"
        })
      }
  }

  const text = {
    title: "EDIT YOUR CARD",
    submitBtn: "Edit Card",
    deleteBtn: "Delete",
    success: "Edit Successful",
    fail: "Could not edit card at this time",
    front: cardInfo.card_info.front,
    back: cardInfo.card_info.back,
    delete: "Card was deleted",
    showDelete: true
  }

  return (
    <div>
      <Form  
        deckId={deck_id} 
        storeData={storeData} 
        state={cardInfo} 
        setState={setCardInfo} 
        wasSuccessful={wasSuccessful}
        text={text}
        handleDelete={handleDelete} />
    </div>
  );
}

export default EditCard;
