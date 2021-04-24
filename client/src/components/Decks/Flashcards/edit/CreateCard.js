import React, { useState } from 'react';
import axios from "axios";
import Form from "./Form"
import { useParams } from 'react-router';

function CreateCard() {
    const [cardData, setCardData] = useState({
        front: "",
        back: ""
    });

    const [wasSuccessful, setWasSuccessful] = useState()

    const { deck_id } = useParams();

    const storeData = () => {
        const newCard = {
            front: cardData.front,
            back: cardData.back
        };

        // send post request
        axios.post(`http://localhost:4000/decks/${deck_id}/cards/create`, newCard).then(
            (res) => setWasSuccessful(true))
            .catch((err) =>setWasSuccessful(false)
        );
    }
    return (
        <div>
            <Form title="CREATE A NEW CARD" btnText="Create Card" deckId={deck_id} storeData={storeData} state={cardData} setState={setCardData} wasSuccessful={wasSuccessful} />
        </div>
    )
}

export default CreateCard
