const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Deck = new Schema({
  deck_title: String,
  deck_description: String,
  deck_color: String,
});

module.exports = mongoose.model("Deck", Deck);
