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
  getUserData,
  getUserById,
  findUserByEmail,
  deleteUser
} = require("../controller/userAuth.controller");

// register user 🟢
router.post("/register", registerUser);
// login user
router.post("/login", rateLimiter, loginUser);
// logout user
router.post("/logout", logoutUser);
// update user
router.put("/update/:id", verifyToken, updateUser);
// forget password
router.patch("/forget-password/:id", rateLimiter, resetPassword);

// get all users data
router.get("/data", getUserData);

// get user by id
// endpoint: api/users/userId/:id
router.get("/userId/:id", rateLimiter, getUserById);

// find user by email 
router.get("/email/:email", findUserByEmail);

// delete user 
router.delete("/delete/:id", deleteUser);

// protectd routes
router.get("/protected", verifyToken, async (req, res) => {
  try {
    return res.status(200).json({
      message: "Protected route",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching protected route",
      error: error.message,
    });
  }
});

module.exports = router;
