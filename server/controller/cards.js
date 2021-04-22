const Card = require("../models/Card");
const Deck = require("../models/Deck");
const mongoose = require("mongoose");

const createCard= (req, res) => {
    // create a new model with information
    const card = new Card({ card_info: req.body});

    card.save().then(() => res.json("Card created!")).catch(() => res.json("Could not create card"))
    // add id to deck "cards" array
    Deck.findById(req.params.deck_id, (err, deck) => {
        if (!deck) {
            res.status(404).send("Deck not found")
        }
        deck.cards.push(card._id)
        deck.save().then(() => res.status(200).send("Id added to deck!")).catch(err => res.json("Could not add card to deck"))
    })
}

const readCard = (req,res) => {
    Card.findById(req.params.card_id, (err, card) => {
        if(err) {
            res.send("There was an error when getting the card")
        } 
        res.json(card)
    })
}

module.exports = {createCard: createCard, readCard: readCard} 