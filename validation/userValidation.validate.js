// register validation 🟢
const registerValidation = (username, email, password) => {
  try {
    if (!username || typeof username !== "string") {
      return "Name must required and should be a string";
    }
    if (!email || typeof email !== "string") {
      return "Email must required and should be a string";
    }
    if (!email.includes("@" || "." || "com" || "net" || "org" || "in")) {
      return "Enter valide email address";
    }
    if (!password || typeof password !== "string") {
      return "Password must required and should be a string";
    }

    if (password.length < 8 || password.length > 16) {
      return "Password must be between 8 to 16 characters";
    }

    return null;
  } catch (error) {
    return {
      status: "Failed",
      message: "Error while validating register user",
    };
  }
};

// login validation
const loginValidation = (email, password) => {
  try {
    if (!email || typeof email !== "string") {
      return "Email must required and should be a string";
    }
    if (!password || typeof password !== "string") {
      return "Password must required and should be a string";
    }

    if (password.length < 8 || password.length > 16) {
      return "Password must be between 8 to 16 characters";
    }

    // more validation
    if (!email.includes("@" || "." || "com" || "net" || "org" || "in")) {
      return "Enter valide email address";
    }

    return null;
  } catch (error) {
    return {
      status: "Failed",
      message: "Error while validating login user",
    };
  }
};

module.exports = { registerValidation, loginValidation };
