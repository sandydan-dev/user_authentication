const express = require("express");
const cors = require("cors");
const cookiePParser = require("cookie-parser");
const app = express();

// modules
const connectionDB = require("./config/userDatabase.db");
const userAuthRoute = require("./router/userAuth.route");

// database connection
connectionDB().then(() => {
  console.log("Database connected successfully");
}).catch((err) => {
  console.log("Database connection failed", err);
});

// middleware
app.use(cors());
app.use(cookiePParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", userAuthRoute);

module.exports = { app };
