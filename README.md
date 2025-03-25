# User Authentication and Authorization with JWT

## Description
This project provides secure user authentication and authorization functionalities, including user registration, login, password reset, and profile updates (email, name, password). It ensures security using JWT tokens, bcrypt for password hashing, and cookie-based token storage.

## Installation Instructions
1. Install all dependencies:
   ```bash
   npm install
   ```
2. Start the application:
   - For production:
     ```bash
     npm start
     ```
   - For development with live reload:
     ```bash
     npm run dev
     ```
   - For integration testing:
     ```bash
     npm test
     ```

## Testing
This project includes integration tests for API endpoints using `Jest` and `Supertest`. The tests ensure that the application behaves as expected in various scenarios.

### Running Tests
1. Ensure the `.env.test` file is properly configured with the test database URI:
   ```properties
   MONGO_URI="mongodb+srv://<username>:<password>@test-cluster.mongodb.net/testDB?retryWrites=true&w=majority"
   NODE_ENV=test
   JWT_SECRET_KEY="your_testing_jwt_secret_key"
   ```
2. Run the tests:
   ```bash
   npm test
   ```
3. The tests will:
   - Connect to the test database.
   - Seed initial data.
   - Run integration tests for all API endpoints.
   - Drop the test database after execution.

### Example Test Output
```bash
> cross-env NODE_ENV=test jest

 PASS  test/validation.test.js

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        3.456s
```

## Usage
Use this project with Postman or similar tools. All routes start with `api/users`:
 - `POST /api/users/register` - Register a new user.
 - `POST /api/users/login` - Login a user (rate-limited).
 - `POST /api/users/logout` - Logout a user.
 - `PUT /api/users/update/:id` - Update user details (protected).
 - `GET /api/users/protected` - Access a protected route (JWT required).
 - `PATCH /api/users/forget-password/:id` - Reset password (rate-limited).
 - `GET /api/users/data` - Get all user data.
 - `GET /api/users/userId/:id` - Get user data by ID.
 - `GET /api/users/email/:email` - Get user data by email.
 - `DELETE /api/users/delete/:id` - Delete a user by ID.

### Features
- **Rate Limiting:** Protect routes from abuse.
- **JWT Authentication:** Secure token-based authentication.
- **Integration Testing:** Comprehensive tests for all API endpoints.
- **Secure Password Storage:** Passwords are hashed using `bcrypt`.

## Technologies Used
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **JWT**: Token-based authentication.
- **Bcrypt**: Password hashing.
- **Rate Limiting**: Protect routes from abuse.
- **MongoDB with Mongoose**: Database for storing user data.
- **Jest**: Testing framework.
- **Supertest**: HTTP assertions for integration testing.

## License
This project is licensed under the MIT License.

## Acknowledgments
Special thanks to the open-source community for providing tools and inspiration for this project.