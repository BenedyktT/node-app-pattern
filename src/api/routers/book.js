const router = require("express").Router();
const booksController = require("../../api/controlers/bookControler");

module.exports = (Books) => {
  const controller = booksController(Books);
  router.get("/", controller.get);
  router.use("/:id", controller.getById);
  router.get("/:id", (req, res) => res.send(req.book));
  router.post("/", controller.post);
  return router;
};
