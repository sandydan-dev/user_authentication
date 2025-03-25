const User = require("../model/userAuth.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/jwtAuth.middleware");
const {
  registerValidation,
  loginValidation,
} = require("../validation/userValidation.validate");

// register user 🟢
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    const validationError = registerValidation(username, email, password);

    if (validationError) {
      return res.status(400).json({
        status: "failed",
        message: validationError.error,
      });
    }
    // check if user exists
    const existsUser = await User.findOne({ email });

    if (existsUser) {
      return res.status(400).json({
        status: "failed",
        message: "User already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error while creating user",
      error: error.message,
    });
  }
};

// login user 🟢
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationError = loginValidation(email, password);

    if (validationError) {
      return res.status(400).json({
        status: "failed",
        message: validationError,
      });
    }

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please fill all the fields",
      });
    }
    // check if user not exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User not found, please register first",
      });
    }
    // match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid credentials",
      });
    }

    // generate token
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error while logging in",
      error: error.message,
    });
  }
};

// logout user
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong",
      data: error,
    });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      user.password = hashPassword;
    }
    await user.save();

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error while updating user",
      error: error.message,
    });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User email not found",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error while updating password",
    });
  }
};

// get all users data
const getUserData = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    const userData = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    });

    return res.status(200).json({
      message: "All users",
      users: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching users",
      error: error.message,
    });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user.id) {
      return {
        status: false,
        message: "User Id not found",
      };
    }
    res.status(200).json({
      status: true,
      message: "User found",
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error while getting user",
      error: error.message,
    });
  }
};

// find by email
const findUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error while getting user",
      error: error.message,
    });
  }
};

// delete user permanently
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user.id) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error while deleting user",
      error: error.message,
    });
  }
};

// export controllers
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  resetPassword,
  getUserData,
  getUserById,
  findUserByEmail,
  deleteUser,
};
