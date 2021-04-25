import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api"

function CardForm({
    onSubmit,
    onCancel,
    initialState = { front: "", back: ""},}) {
        
    const { deckId } = useParams();
    const [card, setCard] = useState(initialState);
    
    const [deck, setDeck] = useState();

    function changeHandler({ target: {name, value}}) {
        setCard((prevState) => ({
            ...prevState,
            [name]: value,
            
        }))
    }

    // useEffect(() => {
    //     if (JSON.stringify(initialState) !== JSON.stringify(card)) {
    //     setCard(initialState)
    //     }
    // }, [initialState])

    useEffect(loadDeck, [deckId]);

    function loadDeck() {
        readDeck(deckId).then(setDeck);
    }

    function submitHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        onSubmit(card);
    }

    return(
        <div>
            <form onSubmit={submitHandler} className="deck-edit">
                <fieldset>
                <div className="form-group">
                        <label htmlFor="name">Front</label> 
                        <textarea
                        type="text"
                        id="name"
                        name="front"
                        className="form-control"
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
                        rows="4"
                        required={true}
                        placeholder="Back of card"
                        value={card.back}
                        onChange={changeHandler}
                        />
                    </div>
                <button className="btn btn-secondary mr-2" type="button" onClick={onCancel}>Cancel</button>
                <button className="btn btn-primary" type="submit">Save</button>
                </fieldset>
            </form>
        </div>
    )
}

export default CardForm;