const bookControler = require("../src/api/controlers/bookControler");

describe("Book controler", () => {
  it("should be defined", () => {
    expect(bookControler).toBeDefined();
  });
  it("is a function", () => {
    expect(typeof bookControler).toBe("function");
  });
  it("returns object with two methods get and post", () => {
    const returnObj = bookControler();
    expect(returnObj).toHaveProperty("get");
    expect(returnObj).toHaveProperty("post");
  });
  describe("have get method that", () => {
    it("returns a array of objects", async () => {
      const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
      };
      class Book {
        static find() {
          return [];
        }
      }
      const res = mockResponse();
      const controler = bookControler(Book);
      await controler.get({}, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});
