const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working...");
});

module.exports = app;
