const mongoose = require("mongoose");
const connect = async () => {
  if (process.env.NODE_ENV === "test") {
    await mongoose.connect("mongodb://localhost:27017/books-test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    mongoose.connect("mongodb://localhost:27017/books-prod", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.once("open", () => {
      console.log("connected");
    });
  }
};

const close = async () => {
  await mongoose.connection.close();
  await mongoose.connection.dropDatabase();
};
const clear = async () => {
  if (process.env.NODE_ENV === "test") {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
};

module.exports = {
  connect,
  close,
  clear,
};
