const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("index page");
});

mongoose.connect("mongodb://127.0.0.1:27017/flashcards", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database is connected!");
});

app.listen(PORT, (req, res) => {
  console.log("Server is running on port: " + PORT);
});
