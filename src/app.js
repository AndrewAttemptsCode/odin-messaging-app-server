const express = require("express");
const cors = require("cors");
const routes = require("../src/routes/index");


const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", routes.user);

module.exports = app;
