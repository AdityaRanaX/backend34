# Installation Guide for Creator's Platform Backend

## Step-by-Step Setup

### 1. Prerequisites Check

Before starting, ensure you have:
- **Node.js v14+** installed: Run `node --version`
- **npm v6+**: Run `npm --version`
- **MongoDB Atlas Account**: Sign up at https://www.mongodb.com/cloud/atlas

### 2. Clone the Repository

```bash
git clone https://github.com/AdityaRanaX/backend34.git
cd backend34
```

### 3. MongoDB Atlas Setup

1. **Create a MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up and create a free account

2. **Create a Cluster**
   - Click "Create a Project"
   - Create a Cluster (M0 Free Tier)
   - Select your region (closest to you)

3. **Create Database User**
   - Go to Database Access
   - Create a user with username and password
   - Note down the credentials

4. **Get Connection String**
   - Go to Clusters → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials

5. **Whitelist Your IP**
   - Go to Network Access
   - Add Current IP Address
   - Or allow access from anywhere (0.0.0.0/0) for development

### 4. Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `dotenv` - Environment variables
- `nodemon` - Development auto-restart

### 5. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example
cp .env.example .env

# Edit .env with your MongoDB URI
```

**Example .env:**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.abc123.mongodb.net/creators_platform?retryWrites=true&w=majority
```

### 6. Start the Server

**Development (auto-reload on changes):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

You should see:
```
✅ MongoDB Connected: cluster0.abc123.mongodb.net
🚀 Server is running on port 5000
```

### 7. Test the API

Use one of these tools to test:

**Option A: REST Client (VS Code Extension)**

1. Install the REST Client extension
2. Open `test.rest` file
3. Click "Send Request" on any endpoint

**Option B: Postman**

1. Download Postman from https://www.postman.com/
2. Import `Creator-Platform-Backend.postman_collection.json`
3. Set `baseUrl` variable to `http://localhost:5000`
4. Run the requests

**Option C: cURL (Command Line)**

```bash
# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"password123"
  }'

# Get all users
curl http://localhost:5000/api/users

# Get user by ID
curl http://localhost:5000/api/users/USER_ID

# Update user
curl -X PUT http://localhost:5000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'

# Delete user
curl -X DELETE http://localhost:5000/api/users/USER_ID
```

## Troubleshooting

### Problem: Cannot connect to MongoDB

**Solution:**
- Verify your MongoDB URI in `.env`
- Check your username and password in the connection string
- Make sure your IP is whitelisted in MongoDB Atlas Network Access
- Ensure the database name matches

### Problem: Port 5000 already in use

**Solution:**
```bash
# Use a different port
PORT=5001 npm start
```

### Problem: Module not found

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Problem: dotenv is not loading

**Solution:**
- Ensure `.env` file is in the root directory
- Restart the server after creating `.env`

## Project Structure After Installation

```
backend34/
├── config/
│   └── database.js
├── controllers/
│   └── userController.js
├── middleware/
│   └── errorHandler.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── .env (Create this)
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── server.js
├── test.rest
└── Creator-Platform-Backend.postman_collection.json
```

## Next Steps

1. Start the server: `npm run dev`
2. Test API endpoints using Postman or REST Client
3. Verify MongoDB stores hashed passwords (View in MongoDB Atlas)
4. Commit code to GitHub (keeping `.env` in .gitignore)
5. Create a Pull Request on GitHub
6. Record a video demo
7. Submit for evaluation

## API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/users/register` | Register new user |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get specific user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

## Security Notes

- Passwords are hashed with **bcrypt** (not returned in API responses)
- Email validation prevents invalid emails
- Unique email constraint prevents duplicates
- Input validation on all fields
- Error messages don't expose sensitive data

## Support

If you face any issues:
1. Check the error message carefully
2. Verify MongoDB URI
3. Check node_modules are installed
4. Restart the server
5. Review the README.md for more details
