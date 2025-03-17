const express = require("express");
const cors = require("cors");
const cookiePParser = require("cookie-parser");
const app = express();

// modules
const connectionDB = require("./config/userDatabase.db");
const userAuthRoute = require("./router/userAuth.route");

// database connection
if (process.env.NODE_ENV !== "test") {
  connectionDB(); // Only connect to the database if not in test environment
}

// middleware
app.use(cors());
app.use(cookiePParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/user", userAuthRoute);

module.exports = { app };
