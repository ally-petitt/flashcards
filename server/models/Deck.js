const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Deck = new Schema({
  deck_info: {
    deck_title: String,
    deck_description: String,
    deck_color: String,
    isStarred: Boolean,
  },
  deck_cards: {
    card_info: {
      card_id: mongoose.ObjectId,
      card_front: String,
      card_back: String,
    },
  },
});

module.exports = mongoose.model("Deck", Deck);
