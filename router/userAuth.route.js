const express = require("express");
const router = express.Router();
const User = require("../model/userAuth.model");
const bcrypt = require("bcrypt");

// routers
const rateLimiter = require("../middleware/rateLimite.middleware");
const { verifyToken } = require("../middleware/jwtAuth.middleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  resetPassword,
} = require("../controller/userAuth.controller");

// register user
router.post("/register", registerUser);
// login user
router.post("/login", rateLimiter, loginUser);
// logout user
router.post("/logout", logoutUser);
// update user
router.put("/update/:id", verifyToken, updateUser);
// forget password
router.patch("/forget-password/:id", rateLimiter, resetPassword);

// protectd routes
router.get("/protected", verifyToken, async (req, res) => {
  res.status(200).json({
    message: "Protected route",
    user: req.user,
  });
});

module.exports = router;
