# Quick Start Guide

Get the Creator's Platform Backend running in 5 minutes!

## Prerequisites
- Node.js v14+ installed
- MongoDB Atlas account (free tier at https://mongodb.com/cloud/atlas)
- Git installed

## 5-Minute Setup

### 1. Clone & Navigate (30 seconds)
```bash
git clone https://github.com/AdityaRanaX/backend34.git
cd backend34
```

### 2. Install Dependencies (1-2 minutes)
```bash
npm install
```

### 3. Configure Database (1 minute)
Create a `.env` file:
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creators_platform?retryWrites=true&w=majority
```

**Get your MongoDB URI:**
1. Go to https://cloud.mongodb.com
2. Create a connection string
3. Add your credentials
4. Whitelist your IP

### 4. Start Server (1 minute)
```bash
npm start
```

You should see:
```
✅ MongoDB Connected: [cluster info]
🚀 Server is running on port 5000
```

### 5. Test an Endpoint (1 minute)

**Using cURL:**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

**Using REST Client in VS Code:**
- Open `test.rest`
- Click "Send Request" on any endpoint

**Using Postman:**
- Import `Creator-Platform-Backend.postman_collection.json`
- Set `baseUrl` to `http://localhost:5000`
- Click "Send"

## Available Commands

```bash
npm start          # Run production server
npm run dev        # Run with auto-reload (watch mode)
npm install        # Install dependencies
npm list           # See installed packages
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## Example Requests

### Register User
```json
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Get All Users
```
GET /api/users
```

## Files Overview

- **server.js** - Main Express server
- **config/database.js** - MongoDB connection
- **models/User.js** - User schema with validations
- **controllers/userController.js** - Business logic (CRUD)
- **routes/userRoutes.js** - API route definitions
- **middleware/errorHandler.js** - Error handling
- **.env** - Environment variables (create this)
- **package.json** - Dependencies

## Detailed Guides

For more information, see:
- [README.md](README.md) - Full documentation
- [INSTALLATION.md](INSTALLATION.md) - Detailed setup
- [TESTING.md](TESTING.md) - How to test APIs
- [GITHUB_PR_GUIDE.md](GITHUB_PR_GUIDE.md) - Push to GitHub
- [VIDEO_DEMO.md](VIDEO_DEMO.md) - Record demo video
- [SUBMISSION_CHECKLIST.md](SUBMISSION_CHECKLIST.md) - Before submitting

## Troubleshooting

### MongoDB connection failed
- Check your MONGODB_URI in .env
- Verify username/password
- Whitelist your IP in MongoDB Atlas

### Port 5000 in use
```bash
# Use different port
PORT=5001 npm start
```

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Start the server
2. ✅ Test API endpoints
3. ✅ Verify passwords are hashed
4. ✅ Push to GitHub
5. ✅ Create Pull Request
6. ✅ Record video demo
7. ✅ Submit for evaluation

## Stack Overview

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Password**: bcrypt hashing
- **Config**: dotenv for environment

## Key Features

✅ User registration with validation  
✅ Secure password hashing (bcrypt)  
✅ Clean MVC folder structure  
✅ Error handling middleware  
✅ MongoDB Atlas integration  
✅ RESTful API design  
✅ Input validation  
✅ Comprehensive documentation  

Happy coding! 🚀
