import React from "react";
import { useHistory } from "react-router-dom";
import { createCard } from "../utils/api";
import { useParams } from "react-router-dom";

import CardForm from "./form";

function CardCreate() {

    const history = useHistory();

    const { deckId } = useParams();

    async function submitHandler(card) {
        await createCard(deckId, card)
        .then(() => {
            history.push(`/decks/${deckId}`)
        })
    }

    return (
        <div>
            
            <CardForm onSubmit={submitHandler} />
        </div>
    )
}

export default CardCreate;