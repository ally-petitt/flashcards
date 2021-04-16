const {
  getDecks,
  getDeck,
  createDeck,
  updateDeck,
} = require("../controller/decks");
const express = require("express");

const deckRoutes = express.Router();

deckRoutes.get("/", getDecks);
deckRoutes.get("/:id", getDeck);
deckRoutes.post("/create", createDeck);
deckRoutes.post("/update/:id", updateDeck);

module.exports = deckRoutes;
