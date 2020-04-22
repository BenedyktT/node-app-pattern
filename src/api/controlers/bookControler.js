const mongoose = require("mongoose");
module.exports = (Model) => {
  const get = async (req, res) => {
    const query = {};
    console.log(req.query);
    if (req.query.genre) {
      console.log(req.query);
      Object.entries(req.query).forEach((q) => (query[q[0]] = q[1]));
    }
    console.log(query);

    const books = await Model.find(query);
    const body = books.map((book) => ({
      ...book.toJSON(),
      links: { self: `http://${req.header("host")}/book/${book._id}` },
    }));

    return res.status(200).json(body);
  };
  const post = async (req, res) => {
    try {
      const newBook = new Model(req.body);
      await newBook.save();
      return res.json(newBook);
    } catch (error) {
      return res.json(error.message);
    }
  };
  const getById = async (req, res, next) => {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
      if (!isValidId) {
        res.status(404).json("Not FOUND");
      }
      const book = await Model.findById(req.params.id);
      if (book) {
        const genre = book.genre.replace(" ", "%20");
        req.book = {
          ...book.toJSON(),
          links: {
            filterByGenre: `http://${req.header("host")}/book?genre=${genre}`,
          },
        };
        next();
        return;
      }
      res.status(404).json("not found");
      return;
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  return { get, post, getById };
};
