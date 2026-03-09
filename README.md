# Creator's Platform Backend

A robust Node.js + Express backend for Creator's Platform with MongoDB database integration.

## Features

✅ User registration and management  
✅ Secure password hashing with bcrypt  
✅ MongoDB integration with Mongoose  
✅ RESTful API endpoints  
✅ Input validation and error handling  
✅ Clean folder structure  

## Project Structure

```
creators-platform-backend/
├── config/
│   └── database.js          # MongoDB connection setup
├── models/
│   └── User.js              # User schema and model
├── controllers/
│   └── userController.js    # Business logic for user operations
├── routes/
│   └── userRoutes.js        # API routes
├── middleware/
│   └── errorHandler.js      # Global error handling
├── server.js                # Main server file
├── package.json             # Dependencies
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore file
└── README.md                # Documentation
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdityaRanaX/backend34.git
   cd backend34
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   Copy .env.example to .env and fill in your MongoDB URI
   ```

   Sample .env:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creators_platform?retryWrites=true&w=majority
   ```

4. **Start the server**
   ```bash
   npm start          # Production
   npm run dev        # Development with nodemon
   ```

## API Endpoints

### 1. Register User
```
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-09T...",
    "updatedAt": "2024-03-09T..."
  }
}
```

### 2. Get All Users
```
GET /api/users

Response (200):
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-03-09T...",
      "updatedAt": "2024-03-09T..."
    }
  ]
}
```

### 3. Get User by ID
```
GET /api/users/:id

Response (200):
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-09T...",
    "updatedAt": "2024-03-09T..."
  }
}
```

### 4. Update User
```
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Jane Doe"
}

Response (200):
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "...",
    "name": "Jane Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-09T...",
    "updatedAt": "2024-03-09T..."
  }
}
```

### 5. Delete User
```
DELETE /api/users/:id

Response (200):
{
  "success": true,
  "message": "User deleted successfully",
  "data": {}
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Missing fields, invalid email format, duplicate email
- **404 Not Found**: User not found, route not found
- **500 Server Error**: Database connection issues, server errors

Example error response:
```json
{
  "success": false,
  "message": "Email already registered"
}
```

## Database Schema

### User Model

| Field | Type | Validation |
|-------|------|-----------|
| name | String | Required, min 3 chars |
| email | String | Required, unique, valid email format |
| password | String | Required, min 6 chars, hashed with bcrypt |
| timestamps | - | createdAt, updatedAt |

**Note**: Passwords are automatically hashed using bcrypt and are never returned in API responses.

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcrypt for password hashing
- **Environment**: dotenv

## Development

### Using Nodemon for Development

```bash
npm run dev
```

This watches for file changes and automatically restarts the server.

### Testing the API

Use Postman or REST Client (VS Code extension) to test:

1. Register a new user
2. Fetch all users
3. Get specific user
4. Update user information
5. Delete user

## Security Features

✅ Passwords hashed with bcrypt (salt rounds: 10)  
✅ Passwords excluded from API responses  
✅ Email validation with regex  
✅ Input sanitization  
✅ MongoDB injection prevention  

## Notes

- The `.env` file should NOT be committed to GitHub (listed in .gitignore)
- Ensure all environment variables are properly set
- Database connection requires active MongoDB Atlas account
- Default port is 5000 (configurable via .env)

## Author

Aditya Rana

## License

MIT
