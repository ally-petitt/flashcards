const Deck = require("../models/Deck");
const mongoose = require("mongoose");

// pseudo code
const createCard= (req, res) => {
    Deck.findById(req.params.deck_id, (err, deck) => {
        if (!deck) {
            res.status(404).send("Deck is not found")
        }    
        const id = mongoose.Types.ObjectId()
        
        deck = {...deck._doc, cards: {...deck._doc.cards, [id]: "card1"}}
        // deck.cards = {...deck.cards,  [id]: req.body}
        console.log(deck)
        
        // deck.save().then(res => res.json("Card added!")).catch(err => res.json("Could not be added"))
        });
}

module.exports = {createCard: createCard}