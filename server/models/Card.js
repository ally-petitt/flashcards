const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  card_info: {
    front: String,
    back: String,
  },
});

module.exports = mongoose.model("Card", CardSchema);
