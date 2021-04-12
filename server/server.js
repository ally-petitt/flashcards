const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const db = require("./config/keys").mongoURI;
const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.listen(PORT, function () {
  console.log("server is running on port: " + PORT);
});
