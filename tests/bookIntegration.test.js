const superest = require("supertest");
const app = require("../app");
const request = superest.agent(app);
const mongoose = require("mongoose");
const { close, clear } = require("../config/db");
const Books = mongoose.model("Books");

describe("book endpoint integration test", () => {
  afterAll(async () => {
    await close();
    await clear();
    request.close();
  });
  describe("get request to /book", () => {
    beforeAll(async () => {
      const newBook = new Books({ title: "testTitle", author: "testAuthor" });
      await newBook.save();
    });
    afterEach(async () => {
      await clear();
    });
    test("should return an array of book objects", async () => {
      const req = await request.get("/book");
      expect(req.status).toBe(200);
      const data = JSON.parse(req.res.text);
      expect(data[0]).toHaveProperty("_id", "author", "title");
    });
  });
  test("should clear db after each test", async () => {
    const req = await request.get("/book");
    const data = req.res.text;
    expect(data).toBe("[]");
  });
  describe("post request to /book", () => {
    let res;
    beforeAll(async () => {
      res = await request.post("/book").send({
        title: "some title",
        author: "some author",
      });
    });
    test("should return an added entry", async () => {
      expect(res.status).toBe(200);
      expect(JSON.parse(res.res.text)).toHaveProperty(
        "author",
        "some author",
        "title",
        "some title"
      );
    });
    test("should successfully save new added entry in db", async () => {
      await request.post("/book").send({
        title: "some other title",
        author: "some other author",
      });

      const server = await request
        .get("/book")
        .then((response) => JSON.parse(response.res.text));
      expect(server.length).toBe(2);
    });
  });
});
