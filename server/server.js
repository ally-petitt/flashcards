const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const deckRoutes = require("./routes/decks");
const { getDecks } = require("./controller/decks");
const app = express();

const PORT = 5000;

app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/home", getDecks);
app.use("/decks", deckRoutes);

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
