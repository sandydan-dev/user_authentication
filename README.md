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
- `POST /api/user/register` - Register a new user.
- `POST /api/user/login` - Login a user.
- `POST /api/user/logout` - Logout a user.
- `POST /api/user/forget-password` - Reset password.

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