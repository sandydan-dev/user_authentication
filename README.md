# User Authentication and Authorization with JWT

## Description
This project provides secure user authentication and authorization functionalities, including user registration, login, password reset, and profile updates (email, name, password). It ensures security using JWT tokens, bcrypt for password hashing, and cookie-based token storage.

## Deployment
The application is deployed on Render. You can access it using the following base URL:

**Base URL:** [https://user-authentication-jk8x.onrender.com/](https://user-authentication-jk8x.onrender.com/)

---

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

---

## API Endpoints
Below is a table of all available API endpoints:

| HTTP Method | Endpoint                              | Description                              | Protected | Rate Limited |
|-------------|---------------------------------------|------------------------------------------|-----------|--------------|
| `POST`      | `/api/users/register`                | Register a new user                      | No        | No           |
| `POST`      | `/api/users/login`                   | Login a user                             | No        | Yes          |
| `POST`      | `/api/users/logout`                  | Logout a user                            | No        | No           |
| `PUT`       | `/api/users/update/:id`              | Update user details                      | Yes       | No           |
| `PATCH`     | `/api/users/forget-password/:id`     | Reset password                           | No        | Yes          |
| `GET`       | `/api/users/data`                    | Get all user data                        | No        | No           |
| `GET`       | `/api/users/userId/:id`              | Get user data by ID                      | No        | Yes          |
| `GET`       | `/api/users/email/:email`            | Get user data by email                   | No        | No           |
| `DELETE`    | `/api/users/delete/:id`              | Delete a user by ID                      | No        | No           |
| `GET`       | `/api/users/protected`               | Access a protected route (JWT required)  | Yes       | No           |

---

## Example Usage
### Base URL
All API endpoints are prefixed with the base URL:
```
https://user-authentication-jk8x.onrender.com/
```

### Example Request
To fetch all user data:
```bash
GET https://user-authentication-jk8x.onrender.com/api/users/data
```

### Example Response
```json
{
  "message": "All users",
  "users": [
    {
      "id": "64f1c2e5b5d6c2a1e8f3a123",
      "username": "testuser",
      "email": "testuser@example.com"
    },
    {
      "id": "64f1c2e5b5d6c2a1e8f3a124",
      "username": "anotheruser",
      "email": "anotheruser@example.com"
    }
  ]
}
```

---

## How to Use API Endpoints

Below are detailed instructions and examples for using each API endpoint:

### 1. Register a New User
**Endpoint:** `POST /api/users/register`  
**Description:** Register a new user.  
**Protected:** No  
**Example Request:**
```bash
curl -X POST https://user-authentication-jk8x.onrender.com/api/users/register \
-H "Content-Type: application/json" \
-d '{"username": "newuser", "email": "newuser@example.com", "password": "password123"}'
```
**Example Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "64f1c2e5b5d6c2a1e8f3a125",
    "username": "newuser",
    "email": "newuser@example.com"
  }
}
```

---

### 2. Login a User
**Endpoint:** `POST /api/users/login`  
**Description:** Login a user and receive a JWT token.  
**Protected:** No  
**Example Request:**
```bash
curl -X POST https://user-authentication-jk8x.onrender.com/api/users/login \
-H "Content-Type: application/json" \
-d '{"email": "newuser@example.com", "password": "password123"}'
```
**Example Response:**
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

---

### 3. Logout a User
**Endpoint:** `POST /api/users/logout`  
**Description:** Logout a user by clearing the session.  
**Protected:** No  
**Example Request:**
```bash
curl -X POST https://user-authentication-jk8x.onrender.com/api/users/logout
```
**Example Response:**
```json
{
  "message": "Logout successful"
}
```

---

### 4. Update User Details
**Endpoint:** `PUT /api/users/update/:id`  
**Description:** Update user details (e.g., email, name, password).  
**Protected:** Yes  
**Example Request:**
```bash
curl -X PUT https://user-authentication-jk8x.onrender.com/api/users/update/64f1c2e5b5d6c2a1e8f3a125 \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{"email": "updateduser@example.com"}'
```
**Example Response:**
```json
{
  "message": "User updated successfully",
  "user": {
    "id": "64f1c2e5b5d6c2a1e8f3a125",
    "email": "updateduser@example.com"
  }
}
```

---

### 5. Reset Password
**Endpoint:** `PATCH /api/users/forget-password/:id`  
**Description:** Reset a user's password.  
**Protected:** No  
**Example Request:**
```bash
curl -X PATCH https://user-authentication-jk8x.onrender.com/api/users/forget-password/64f1c2e5b5d6c2a1e8f3a125 \
-H "Content-Type: application/json" \
-d '{"password": "newpassword123"}'
```
**Example Response:**
```json
{
  "message": "Password reset successfully"
}
```

---

### 6. Get All User Data
**Endpoint:** `GET /api/users/data`  
**Description:** Retrieve all user data.  
**Protected:** No  
**Example Request:**
```bash
curl -X GET https://user-authentication-jk8x.onrender.com/api/users/data
```
**Example Response:**
```json
{
  "message": "All users",
  "users": [
    {
      "id": "64f1c2e5b5d6c2a1e8f3a123",
      "username": "testuser",
      "email": "testuser@example.com"
    }
  ]
}
```

---

### 7. Get User Data by ID
**Endpoint:** `GET /api/users/userId/:id`  
**Description:** Retrieve user data by ID.  
**Protected:** No  
**Example Request:**
```bash
curl -X GET https://user-authentication-jk8x.onrender.com/api/users/userId/64f1c2e5b5d6c2a1e8f3a123
```
**Example Response:**
```json
{
  "message": "User found",
  "user": {
    "id": "64f1c2e5b5d6c2a1e8f3a123",
    "username": "testuser",
    "email": "testuser@example.com"
  }
}
```

---

### 8. Get User Data by Email
**Endpoint:** `GET /api/users/email/:email`  
**Description:** Retrieve user data by email.  
**Protected:** No  
**Example Request:**
```bash
curl -X GET https://user-authentication-jk8x.onrender.com/api/users/email/testuser@example.com
```
**Example Response:**
```json
{
  "message": "User found",
  "user": {
    "id": "64f1c2e5b5d6c2a1e8f3a123",
    "username": "testuser",
    "email": "testuser@example.com"
  }
}
```

---

### 9. Delete a User by ID
**Endpoint:** `DELETE /api/users/delete/:id`  
**Description:** Delete a user by their ID.  
**Protected:** No  
**Example Request:**
```bash
curl -X DELETE https://user-authentication-jk8x.onrender.com/api/users/delete/64f1c2e5b5d6c2a1e8f3a123
```
**Example Response:**
```json
{
  "message": "User deleted successfully"
}
```

---

### 10. Access a Protected Route
**Endpoint:** `GET /api/users/protected`  
**Description:** Access a protected route that requires a valid JWT token.  
**Protected:** Yes  
**Example Request:**
```bash
curl -X GET https://user-authentication-jk8x.onrender.com/api/users/protected \
-H "Authorization: Bearer your_jwt_token"
```
**Example Response:**
```json
{
  "message": "Access granted to protected route"
}
```

---

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

---

## Features
- **Rate Limiting:** Protect routes from abuse.
- **JWT Authentication:** Secure token-based authentication.
- **Integration Testing:** Comprehensive tests for all API endpoints.
- **Secure Password Storage:** Passwords are hashed using `bcrypt`.

---

## Technologies Used
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **JWT**: Token-based authentication.
- **Bcrypt**: Password hashing.
- **Rate Limiting**: Protect routes from abuse.
- **MongoDB with Mongoose**: Database for storing user data.
- **Jest**: Testing framework.
- **Supertest**: HTTP assertions for integration testing.

---

## License
This project is licensed under the MIT License.

---

## Acknowledgments
Special thanks to the open-source community for providing tools and inspiration for this project.