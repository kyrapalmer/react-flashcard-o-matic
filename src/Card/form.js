import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api"

function CardForm({
    onSubmit,
    initialState = {front: "", back: ""},}) {
        
    const history = useHistory();
    const { deckId } = useParams();
    
    const [card, setCard] = useState(initialState);
    const [deck, setDeck] = useState({ name: "", description: "" });

    function changeHandler({ target: {name, value}}) {
        setCard((prevState) => ({
            ...prevState,
            [name]: value,
            
        }))
    }

    useEffect(loadDeck, [deckId]);
    
    function loadDeck() {
        readDeck(deckId).then(setDeck);
    }

    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        onSubmit(card);
    }

    function cancel() {
        history.goBack();
    }

    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home" /> Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">{deck.name}</li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <form onSubmit={submitHandler} className="deck-edit">
                <fieldset>
                <div className="form-group">
                        <label htmlFor="name">Front</label> 
                        <textarea
                        type="text"
                        id="name"
                        name="front"
                        className="form-control"
                        rows="2"
                        required={true}
                        value={card.front}
                        placeholder="Front of card"
                        onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Back</label>
                        <textarea
                        id="description"
                        name="back"
                        className="form-control"
                        rows="2"
                        required={true}
                        placeholder="Back of card"
                        value={card.back}
                        onChange={changeHandler}
                        />
                    </div>
                <button className="btn btn-secondary mr-2" type="button" onClick={cancel}>Cancel</button>
                <button className="btn btn-primary" type="submit">Save</button>
                </fieldset>
            </form>
        </div>
    )
}

export default CardForm;