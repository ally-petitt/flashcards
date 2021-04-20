const Deck = require("../models/Deck");

// generate random id
mongoose.Types.ObjectId();

// pseudo code
const makeCard= (req, res) => {
    const deck = Deck.findById(req.params.id)
    deck.cards += { card_info: {card_id = mongoose.Types.ObjectId()}}
}