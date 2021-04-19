const Deck = require("../models/Deck");

const getDecks = (req, res) => {
  Deck.find((err, decks) => {
    if (err) {
      console.log(err);
    } else {
      res.json(decks);
    }
  });
};

const getDeck = (req, res) => {
  let id = req.params.id;
  Deck.findById(id, (err, deck) => {
    res.json(deck);
  });
};

const createDeck = (req, res) => {
  let deck = new Deck(req.body);
  deck
    .save()
    .then((deck) => {
      res.status(200).json({ status: "deck added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new deck failed");
    });
};

const updateDeck = (req, res) => {
  Deck.findById(req.params.id, (err, deck) => {
    if (!deck) {
      res.status(404).send("Deck is not found");
    } else {
      deck.deck_info = req.body.deck_info;

      deck
        .save()
        .then((deck) => {
          res.json("Deck Updated!");
        })
        .catch((err) => {
          res.status.send(400).send("Update not possible");
        });
    }
  });
};

const deleteDeck = (req, res) => {
  Deck.findById(req.params.id, (err, deck) => {
    if (!deck) {
      res.status(404).send("Deck is not found");
    } else {
      deck
        .delete()
        .then((deck) => res.json("Deck deleted"))
        .catch((err) => res.status(404).send("Could not delete deck"));
    }
  });
};

const crudFunctions = {
  getDecks: getDecks,
  getDeck: getDeck,
  createDeck: createDeck,
  updateDeck: updateDeck,
  deleteDeck: deleteDeck,
};

module.exports = crudFunctions;
