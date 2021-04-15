const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Deck = new Schema({
  deck_name: String,
  deck_color: String,
});

module.exports = mongoose.model("Deck", Deck);
