const jwt = require("jsonwebtoken");
const User = require("../model/userAuth.model");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (user) => {
  try {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1y",
      }
    );
    return token;
  } catch (error) {
    console.log("Error while creating token", error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const tokenHeader = authHeader && authHeader.split(" ")[1];

    const tokenCookie = req.cookies.token;

    const token = tokenHeader || tokenCookie;

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Token not provided.",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized, invalid token",
      });
    }
    // check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "User not exits",
      });
    }

    // if user exists
    req.user = {
      id: user._id,
      email: user.email,
      // token
      token: token,
    };

    next();
  } catch (error) {
    console.log("Error while verifying token", error);
    return res.status(500).json({
      status: "failed",
      message: "Error while verifying token",
      error: error.message,
    });
  }
};

module.exports = { generateToken, verifyToken };
