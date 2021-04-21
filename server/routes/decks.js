const {
  getDeck,
  createDeck,
  updateDeck,
  deleteDeck,
} = require("../controller/decks");
const {
  createCard
} = require("../controller/cards")
const express = require("express");

const deckRoutes = express.Router();

// decks
deckRoutes.get("/:id", getDeck);
deckRoutes.post("/create", createDeck);
deckRoutes.post("/update/:id", updateDeck);
deckRoutes.delete("/delete/:id", deleteDeck);

// cards
deckRoutes.post("/:deck_id/cards/create", createCard)

module.exports = deckRoutes;
 