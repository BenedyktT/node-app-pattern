const mongoose = require("mongoose");

const books = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model("Books", books);
