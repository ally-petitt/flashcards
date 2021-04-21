const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Deck = new Schema({
  deck_info: {
    title: String,
    description: String,
    color: String,
    isStarred: Boolean,
  }, 
});

module.exports = mongoose.model("Deck", Deck);
