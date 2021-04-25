import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";
import { useParams } from "react-router-dom";

import CardForm from "./form";

function CardEdit() {

    const history = useHistory();

    const { deckId, cardId } = useParams();
    const [card, setCard] = useState();

    useEffect(loadCard, [cardId]);

    function loadCard() {
        readCard(cardId).then(setCard);
    }

    function submitHandler(card) {
        updateCard(card).then(() => {
            history.push(`/decks/${deckId}`)
        })
    }

    function cancel() {
        history.goBack();
    }

    const renderForm = cardId ? (
        <CardForm onCancel={cancel} onSubmit={submitHandler} initialState={card}/>
    ) : (
        <p>Loading...</p>
    );
    

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home" /> Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card
                    </li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            {renderForm}
        </div>
    )
}

export default CardEdit;