const request = require("supertest");
const { app } = require("../app");
const http = require("http");
const { verifyToken } = require("../middleware/jwtAuth.middleware");
const User = require("../model/userAuth.model");
const bcrypt = require("bcrypt");
// register user

let server;
beforeAll((done) => {
  // Start the server before running the tests
  server = http.createServer(app);
  server = app.listen(3000, () => {
    console.log("Server is running on port 3000");
    done();
  });
});
afterAll((done) => {
  // Close the server after running the tests
  server.close(() => {
    done();
  });
});
describe("GET /api/user/protected", () => {
  it("should return 401 if token is not provided", async () => {
    const response = await request(app).get("/api/user/protected");
    expect(response.status).toBe(401);
  });
  it("should return 401 if token is invalid", async () => {
    const response = await request(app)
      .get("/api/user/protected")
      .set("Authorization", "Bearer invalidtoken");
    expect(response.status).toBe(401);
  });
});
