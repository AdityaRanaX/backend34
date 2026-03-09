# API Testing Guide

## Overview

This guide covers how to test all API endpoints with different tools and scenarios.

## Quick Start

### 1. Start the Server
```bash
npm start
# or for development
npm run dev
```

Server runs on: `http://localhost:5000`

### 2. Open Testing Tool

Choose ONE:
- **VS Code REST Client** (Recommended for this project)
- **Postman** (Full-featured)
- **cURL** (Command line)

## Testing with VS Code REST Client

### Setup

1. Install "REST Client" extension by Huachao Mao from VS Code Marketplace
2. Open `test.rest` file in VS Code
3. Click "Send Request" button above each request

### Test Endpoints

#### 1. Check Server Status
```
GET http://localhost:5000/
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Welcome to Creator's Platform Backend API",
  "version": "1.0.0"
}
```

#### 2. Register User
```
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "John Creator",
  "email": "john@example.com",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Creator",
    "email": "john@example.com",
    "createdAt": "2024-03-09T10:30:00.000Z",
    "updatedAt": "2024-03-09T10:30:00.000Z"
  }
}
```

**Note:** Password is NOT returned!

#### 3. Get All Users
```
GET http://localhost:5000/api/users
```

**Expected Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Creator",
      "email": "john@example.com",
      "createdAt": "2024-03-09T10:30:00.000Z",
      "updatedAt": "2024-03-09T10:30:00.000Z"
    }
  ]
}
```

#### 4. Get User by ID
```
GET http://localhost:5000/api/users/507f1f77bcf86cd799439011
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Creator",
    "email": "john@example.com",
    "createdAt": "2024-03-09T10:30:00.000Z",
    "updatedAt": "2024-03-09T10:30:00.000Z"
  }
}
```

#### 5. Update User
```
PUT http://localhost:5000/api/users/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "name": "John Updated"
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john@example.com",
    "createdAt": "2024-03-09T10:30:00.000Z",
    "updatedAt": "2024-03-09T10:31:00.000Z"
  }
}
```

#### 6. Delete User
```
DELETE http://localhost:5000/api/users/507f1f77bcf86cd799439011
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {}
}
```

## Error Cases to Test

### Error 1: Duplicate Email
```
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Another User",
  "email": "john@example.com",
  "password": "password456"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### Error 2: Invalid Email Format
```
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Bad Email User",
  "email": "invalidemail",
  "password": "password123"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Please provide a valid email"
}
```

### Error 3: Missing Required Field
```
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Missing Password",
  "email": "user@example.com"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Please provide name, email, and password"
}
```

### Error 4: Short Password
```
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Short Pass",
  "email": "shortpass@example.com",
  "password": "123"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Password must be at least 6 characters long"
}
```

### Error 5: Short Name
```
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "AB",
  "email": "short@example.com",
  "password": "password123"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Name must be at least 3 characters long"
}
```

### Error 6: Invalid User ID
```
GET http://localhost:5000/api/users/invalidid
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Invalid user ID"
}
```

### Error 7: User Not Found
```
GET http://localhost:5000/api/users/507f1f77bcf86cd799999999
```

**Expected Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

### Error 8: Update with Duplicate Email
Assuming user2 exists with email "jane@example.com":

```
PUT http://localhost:5000/api/users/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "email": "jane@example.com"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Email already in use"
}
```

## Testing with Postman

### 1. Import Collection
- Open Postman
- Click "Import"
- Select `Creator-Platform-Backend.postman_collection.json`
- Collection will be imported with all 6 endpoints

### 2. Set Base URL
- Click "Environments" 
- Create new environment called "Development"
- Add variable: `baseUrl` = `http://localhost:5000`
- Select the environment before running requests

### 3. Run Individual Requests
- Click each request in the collection
- Click "Send"
- View response in the panel below

### 4. Test Sequence
1. Register User (save the user ID from response)
2. Get All Users
3. Get User by ID (use the ID from step 1)
4. Update User (use the ID from step 1)
5. Delete User (use the ID from step 1)
6. Try to get deleted user (should fail with 404)

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Creator",
    "email": "john@example.com",
    "password": "password123"
  }' \
  | jq
```

### Get All Users
```bash
curl http://localhost:5000/api/users | jq
```

### Get User by ID
```bash
curl http://localhost:5000/api/users/USER_ID_HERE | jq
```

### Update User
```bash
curl -X PUT http://localhost:5000/api/users/USER_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}' \
  | jq
```

### Delete User
```bash
curl -X DELETE http://localhost:5000/api/users/USER_ID_HERE | jq
```

**Note:** `| jq` formats JSON output nicely (install jq from https://stedolan.github.io/jq/)

## Checking Hashed Passwords in MongoDB

### Via MongoDB Atlas Dashboard

1. Go to https://cloud.mongodb.com
2. Login to your account
3. Click on your cluster
4. Go to "Browse Collections"
5. Select "creators_platform" database
6. Select "users" collection
7. Click on a user document to expand it
8. View the password field (should be hashed like: `$2b$10$...`)

### Via MongoDB Shell

```bash
# Connect to MongoDB
mongosh "mongodb+srv://username:password@cluster.mongodb.net/creators_platform"

# View users
db.users.find()

# View user with formatted output
db.users.findOne({email: "john@example.com"})
```

Output will show the hashed password, e.g.:
```
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "John Creator",
  email: "john@example.com",
  password: "$2b$10$K7kWk6X5qzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQ",
  createdAt: ISODate("2024-03-09T10:30:00.000Z"),
  updatedAt: ISODate("2024-03-09T10:30:00.000Z")
}
```

## Test Checklist

Use this checklist to verify all functionality:

### Basic Functionality
- [ ] Server starts without errors
- [ ] Health check endpoint (GET /) works
- [ ] Can register a new user
- [ ] User appears in get all users
- [ ] Can get user by ID
- [ ] Password is not returned in responses
- [ ] Can update user name
- [ ] Can update user email
- [ ] Can delete a user
- [ ] Deleted user no longer appears in list

### Validation
- [ ] Duplicate email is rejected
- [ ] Invalid email format is rejected
- [ ] Missing required fields are rejected
- [ ] Short password is rejected
- [ ] Short name is rejected

### Error Handling
- [ ] Invalid user ID shows error 400
- [ ] Non-existent user id shows error 404
- [ ] Updating with duplicate email fails
- [ ] Deleting non-existent user fails

### Database
- [ ] MongoDB connection is successful
- [ ] Users are stored in database
- [ ] Passwords are hashed (not plain text)
- [ ] Timestamps are created automatically

## Response Time Testing

For performance verification:

```bash
# Time a request (bash)
time curl http://localhost:5000/api/users

# Results should show:
# Real time: < 100ms
# User time: < 50ms
# System time: < 20ms
```

## Load Testing (Optional Advanced)

To test server under load:

```bash
# Install Apache Bench
# macOS: brew install ab
# Ubuntu: sudo apt-get install apache2-utils

# Run 100 requests with 10 concurrent
ab -n 100 -c 10 http://localhost:5000/api/users
```

## Troubleshooting

### Issue: Connection refused
- Check if server is running: `npm start`
- Verify port 5000 is not in use
- Check firewall settings

### Issue: MongoDB connection failed
- Check MONGODB_URI in .env
- Verify IP is whitelisted in MongoDB Atlas
- Check username/password in connection string

### Issue: Password not hashing
- Check bcrypt is installed: `npm ls bcrypt`
- Verify server restarted after .env update
- Clear browser cache and retry

### Issue: Duplicate email error not working
- Ensure unique index is created in MongoDB: `db.users.getIndexes()`
- Check if email is in lowercase in requests

## Best Practices

1. **Always test error cases** - Not just happy path
2. **Verify response codes** - 201 for create, 200 for success, 400 for client error
3. **Check response format** - All responses should have `success` field
4. **Test edge cases** - Empty strings, special characters, very long inputs
5. **Verify data persistence** - Shut down server and restart, data should remain
6. **Check security** - Passwords never exposed, emails validated

## Next Steps

After testing:
1. ✅ Document any issues found
2. ✅ Fix any bugs
3. ✅ Re-test all endpoints
4. ✅ Record video demo
5. ✅ Commit code to GitHub
6. ✅ Create Pull Request
7. ✅ Submit for evaluation
