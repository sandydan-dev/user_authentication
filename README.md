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
   - For continuous testing:
     ```bash
     npm test
     ```

## Usage
Use this project with Postman or similar tools. All routes start with `api/user`:
 - `post request : http://localhost:5000/api/user/register` 
 - `post request : http://localhost:5000/api/user/login`  (rate-limiter)
 - `post request : http://localhost:5000/api/user/logout`
 - `put  request : http://localhost:5000/api/user/update/(id)`
 - `get  request : http://localhost:5000/api/user/protected` // protected route with jwt token
 - `patch request : http://localhost:5000/api/user/forget-password/(id)`   (rate-limiter)
 - `get request : http://localhost:5000/api/user/data` // get user data
 - `get request : http://localhost:5000/api/user/userId/67dab329b9608c791e29a0df` // get user data by id
 - `get request : http://localhost:5000/api/user/email/john@example.com` // get user data by id
 - `delete request : http://localhost:5000/api/user/delete/67dab329b9608c791e29a0df` // get user data by id
Features include rate limiting, JWT token creation and verification, and secure cookie-based token storage.

## Technologies Used
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **JWT**: Token-based authentication.
- **Bcrypt**: Password hashing.
- **Rate Limiting**: Protect routes from abuse.
- **MongoDB with Mongoose**: Database for storing user data.
- **Jest**: Testing framework.

## License
This project is licensed under the MIT License.

## Acknowledgments
Special thanks to the open-source community for providing tools and inspiration for this project.