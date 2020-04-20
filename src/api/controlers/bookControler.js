module.exports = (Model) => {
  const get = async (req, res) => {
    const result = await Model.find();
    return res.json(result);
  };
  const post = async (req, res) => {
    const book = { title: "Something", author: "Something else" };
    const newBook = new Model(book);
    await newBook.save();
    return res.json(newBook);
  };

  return { get, post };
};
