const {
  getDeck,
  createDeck,
  updateDeck,
  deleteDeck,
} = require("../controller/decks");
const express = require("express");

const deckRoutes = express.Router();

deckRoutes.get("/:id", getDeck);
deckRoutes.post("/create", createDeck);
deckRoutes.post("/update/:id", updateDeck);
deckRoutes.delete("/delete/:id", deleteDeck);

module.exports = deckRoutes;
 