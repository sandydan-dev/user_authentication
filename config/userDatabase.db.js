const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const URI = process.env.MONGO_URI;
const connectionDB = async () => {
  await mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected to MongoDB : ", process.env.NODE_ENV);
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
};

module.exports = connectionDB;
