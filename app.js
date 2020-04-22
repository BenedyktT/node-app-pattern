const express = require("express");
const app = express();
require("./config/db").connect();
const Book = require("./models/Book");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: true }));
app.use("/book", require("./src/api/routers/book")(Book));
app.get("/", (req, res) => {
  res.redirect("/book");
});

module.exports = app;
