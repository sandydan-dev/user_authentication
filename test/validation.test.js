const {
  registerValidation,
  loginValidation,
} = require("../validation/userValidation.validate");

describe("register validation", () => {
  // if name is not provided
  it("should return error if name is not provided", () => {
    let mockData = {
      name: "",
      email: "test@gmail.com",
      password: "12345678",
    };
    const result = registerValidation(
      mockData.name,
      mockData.email,
      mockData.password
    );
    expect(result).toBe("Name must required and should be a string");
  });

  // if email is not provided
  it("should return error if email if not provided", () => {
    let mockData = {
      name: "test",
      email: "",
      password: "12345678",
    };
    const result = registerValidation(
      mockData.name,
      mockData.email,
      mockData.password
    );
    expect(result).toBe("Email must required and should be a string");
  });

  // if email is invaldi
  it("should return error if email is invalid", () => {
    let mockData = {
      name: "test",
      email: "test",
      password: "12345678",
    };
    //
    const result = registerValidation(
      mockData.name,
      mockData.email,
      mockData.password
    );
    expect(result).toBe("Enter valide email address");
  });

  // if password is not provided
  it("should return error if password is not provided", () => {
    let mockData = {
      name: "test",
      email: "test@gmail.com",
      password: "",
    };
    const result = registerValidation(
      mockData.name,
      mockData.email,
      mockData.password
    );
    expect(result).toBe("Password must required and should be a string");
  });

  // if password is greater than 8 characters and less than 16 characters
  it("should return error if password is greater than 8 characters and less than 16 characters", () => {
    let mockData = {
      name: "test",
      email: "test@gmail.com",
      password: "1234567",
    };

    const result = registerValidation(
      mockData.name,
      mockData.email,
      mockData.password
    );
    expect(result).toBe("Password must be between 8 to 16 characters");
  });
});

describe("login validation", () => {
  // if email is not provided
  it("should return error if email is not provided", () => {
    let mockData = {
      email: "",
      password: "12345678",
    };
    const result = loginValidation(mockData.email, mockData.password);
    expect(result).toBe("Email must required and should be a string");
  });

  // if password is not provided
  it("should return error if password is not provided", () => {
    let mockData = {
      email: "test@gmail.com",
      password: "",
    };
    const result = loginValidation(mockData.email, mockData.password);
    expect(result).toBe("Password must required and should be a string");
  });
});
