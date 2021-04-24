import React, { useState } from 'react';
import axios from "axios";
import Form from "./Form"
import { useParams } from 'react-router';

function CreateCard() {
    const [cardInfo, setCardInfo] = useState({
        card_info: {
        front: "",
        back: ""
        }
    });

    const [wasSuccessful, setWasSuccessful] = useState()

    const { deck_id } = useParams();

    const storeData = () => {
        const newCard = {
            front: cardInfo.front,
            back: cardInfo.back
        };

        // send post request
        axios.post(`http://localhost:4000/decks/${deck_id}/cards/create`, newCard).then(
            (res) => setWasSuccessful(true))
            .catch((err) =>setWasSuccessful(false)
        );
    }
    return (
        <div>
            <Form title="CREATE A NEW CARD" btnText="Create Card" deckId={deck_id} storeData={storeData} state={cardInfo} setState={setCardInfo} wasSuccessful={wasSuccessful} />
        </div>
    )
}

export default CreateCard
