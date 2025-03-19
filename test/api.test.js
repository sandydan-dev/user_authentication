const request = require("supertest");
const { app } = require("../app");
const { registerValidation } = require("../validation/userValidation.validate");
const User = require("../model/userAuth.model");

// Mock validation and model methods
jest.mock("../validation/userValidation.validate", () => ({
  registerValidation: jest.fn(),
}));

jest.mock("../model/userAuth.model", () => ({
  create: jest.fn(),
  findOne: jest.fn(),
}));

describe("POST /api/user/register return new user data", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    // Mock validation to return no errors
    registerValidation.mockReturnValue(null);

    // Mock User.findOne to return null (user does not exist)
    User.findOne.mockResolvedValue(null);

    // Mock User.create to resolve with the new user
    User.create.mockResolvedValue({
      _id: "mockedUserId",
      ...userData,
      password: "hashedPassword",
    });

    const response = await request(app)
      .post("/api/user/register")
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data).toHaveProperty("password");
  });
});
