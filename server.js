const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const api = require("./root/routes/api.js");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/weatherDB");

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", api);

app.listen(3001, function () {
  console.log("Server up and running on port 3001");
});
