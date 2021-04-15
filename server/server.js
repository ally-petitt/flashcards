const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Deck = require("./models/deck");
const app = express();

const PORT = 3000;

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
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database is connected!");
});

const deckRoutes = express.Router();
app.use("/decks", deckRoutes);

deckRoutes.route("/").get((req, res) => {
  Deck.find((err, decks) => {
    if (err) {
      console.log(err);
    } else {
      res.json(decks);
    }
  });
});
