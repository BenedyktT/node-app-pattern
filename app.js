const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("./config/db")();
const Book = require("./models/Book");

app.use("/book", require("./src/api/routers/book")(Book));
app.get("/", (req, res) => {
  res.redirect("/book");
});

app.listen(PORT, () => {
  console.log("server running");
});
