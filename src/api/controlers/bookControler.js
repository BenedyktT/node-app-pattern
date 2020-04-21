module.exports = (Model) => {
  const get = async (req, res) => {
    const result = await Model.find();
    return res.status(200).json(result);
  };
  const post = async (req, res) => {
    const newBook = new Model(req.body);
    await newBook.save();
    return res.json(newBook);
  };

  return { get, post };
};
