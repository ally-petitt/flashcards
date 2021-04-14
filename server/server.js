const express = require("express");
const cors = require("cors");
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
