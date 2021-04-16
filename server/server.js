const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Deck = require("./models/Deck");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("index page");
});

app.listen(PORT, (req, res) => {
  console.log("Server is running on port: " + PORT);
});

mongoose.connect("mongodb://127.0.0.1:27017/decks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database is connected!");
});

const deckRoutes = express.Router();
app.use("/decks", deckRoutes);

// TODO: after these routes are working, organize them in separate files to prevent server.js from getting to large

deckRoutes.route("/").get((req, res) => {
  Deck.find((err, decks) => {
    if (err) {
      console.log(err);
    } else {
      res.json(decks);
    }
  });
});

deckRoutes.route("/:id").get((req, res) => {
  // it gets the id parameter from the route
  let id = req.params.id;
  Deck.findById(id, (err, deck) => {
    res.json(deck);
  });
});

deckRoutes.route("/add").post((req, res) => {
  // TODO: the request is appearing as undefined
  console.log(req.body.deck_title);
  let deck = new Deck(req.body);
  console.log(deck);
  deck
    .save()
    .then((deck) => {
      res.status(200).json({ status: "deck added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new deck failed");
    });
});

deckRoutes.route("/update/:id").post((req, res) => {
  Deck.findById(req.params.id, (err, deck) => {
    if (!deck) {
      res.status(404).send("deck is not found");
    } else {
      deck.deck_title = req.body.deck_title;
      deck.deck_description = req.body.deck_description;
      deck.deck_color = req.body.deck_color;

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
});
