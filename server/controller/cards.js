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

const updateCard = (req, res) => {
    Card.findById(req.params.card_id, (err, card) => {
        if(err) {
            res.send("There was an error when getting the card")
        } 
        card.card_info = req.body.card_info
        card.save().then(() => res.send("Card updated!")).catch(() => res.send("Card could not be updated"))
    })
}

const deleteCard = (req, res) => {
    // delete card row in database
    Card.findById(req.params.card_id, (err, card) => {
        if (!card) {
        res.status(404).send("Card is not found");
        } else {
        card
            .delete()
            .then((card) => res.json("Card deleted"))
            .catch((err) => res.status(404).send("Could not delete card"));
        }
  });

  // update "cards" array in deck
  Deck.findById(req.params.deck_id, (err, deck) => {
    if (!deck) {
        res.status(404).send("Deck containing this card not found")
    }
    deck.cards = deck.cards.filter((value, index, arr) => {return value != req.params.card_id})

    deck.save()
  })
}

module.exports = {createCard: createCard, readCard: readCard, updateCard: updateCard, deleteCard: deleteCard} 