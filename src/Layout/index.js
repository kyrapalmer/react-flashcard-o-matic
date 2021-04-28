import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Home from "../Home";
import Study from "../Deck/Study/study";
import NotFound from "./NotFound";
import Header from "./Header";
import DeckEdit from "../Deck/edit";
import DeckView from "../Deck/view";
import CardEdit from "../Card/edit";
import CardCreate from "../Card/create";
import DeckCreate from "../Deck/create";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardCreate />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route exact path="/decks">
            <Redirect to="/" />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;