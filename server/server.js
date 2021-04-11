import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.listen(PORT, function () {
  console.log("server is running on port: " + PORT);
});
