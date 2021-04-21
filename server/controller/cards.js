const Card = require("../models/Card");
const Deck = require("../models/Deck");
const mongoose = require("mongoose");

const createCard= (req, res) => {
    // create a new model with information
    const card = new Card({ card_info: req.body});

    
    // add id to deck "cards" array
    Deck.findById(req.params.deck_id, (err, deck) => {
        if (!deck) {
            res.status(404).send("Deck not found")
        }
        // makes it faster to find cooresponding cards
        deck.cards.push(card._id)
        deck.save().then(() => res.status(200).send("Id added to deck!")).catch(err => res.json("Could not add card to deck"))
    })
}

module.exports = {createCard: createCard} 