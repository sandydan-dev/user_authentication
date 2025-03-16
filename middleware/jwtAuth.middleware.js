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
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // if not decoded give specific error message, if decoded give specific error message
    if (!decoded) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized",
      });
    }

    // check if user exists
    const user = await User.findById(decoded.id);
    // give error message user not exits
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
  }
};

module.exports = { generateToken, verifyToken };
