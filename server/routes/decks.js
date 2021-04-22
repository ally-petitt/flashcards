const {
  getDeck,
  createDeck,
  updateDeck,
  deleteDeck,
} = require("../controller/decks");
const {
  createCard,
  readCard,
  readCards,
  updateCard,
  deleteCard
} = require("../controller/cards")
const express = require("express");

const deckRoutes = express.Router();

// decks
deckRoutes.get("/:id", getDeck);
deckRoutes.post("/create", createDeck);
deckRoutes.post("/update/:id", updateDeck);
deckRoutes.delete("/delete/:id", deleteDeck);
deckRoutes.get("/view-cards/:id", readCards)

// cards
deckRoutes.post("/:deck_id/cards/create", createCard)
deckRoutes.get("/:deck_id/cards/:card_id", readCard)
deckRoutes.post("/:deck_id/cards/update/:card_id", updateCard)
deckRoutes.delete("/:deck_id/cards/delete/:card_id",deleteCard )


module.exports = deckRoutes;
 