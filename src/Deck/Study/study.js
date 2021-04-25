import React, { useState, useEffect } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";

function Study() {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();

  useEffect(processDeck, [deckId]);

  function processDeck() {
    readDeck(deckId).then((value) => {
      setDeck(value);
      setCards(value["cards"]);
    });
  }

  const [side, setSide] = useState("front");

  const handleFlip = () => {
    if (side === "front") {
      setSide("back");
    } else {
      setSide("front");
    }
  };

  const [cardInd, setCardInd] = useState(0);

  const history = useHistory();

  const handleNext = () => {
    if (cardInd + 1 < deck["cards"].length) {
      setCardInd(cardInd + 1);
      setSide("front");
    } else {
      if (window.confirm("Reset cards?\n\nPress cancel to return home.")) {
        setCardInd(0);
        setSide("front");
      } else {
        history.push("/");
      }
    }
  };

  if (cards.length > 2) {
    return (
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <span className="oi oi-home" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              {deck.name}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
                Study
            </li>
          </ol>
        </nav>
        <div>
            <h2>Study: {deck.name}</h2>
        </div>
        <div>
            <div className="card-container">
                <div className="card-body border">
                    <h4>Card {cardInd + 1} of {cards.length}</h4>
                    <p>{deck["cards"][cardInd][side]}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                    {side === "back" && <button className="btn btn-secondary" onClick={handleNext}>Next</button>}
                    
                </div>
            </div>
        </div>
      </div>
    );
  } else {
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
              {deck.name}
            </li>
          </ol>
        </nav>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study.</p>
        <Link to="/decks/:deckId/cards/new" className="btn btn-primary">
          + Add Cards
        </Link>
      </div>
    );
  }
}

export default Study;
