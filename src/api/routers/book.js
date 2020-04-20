const router = require("express").Router();
const booksController = require("../../api/controlers/bookControler");

module.exports = (Books) => {
  const controller = booksController(Books);
  router.get("/", controller.get);
  router.post("/", controller.post);
  return router;
};
