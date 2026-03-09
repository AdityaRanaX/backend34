# Architecture & Code Flow Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                              │
│                 (Postman / REST Client)                      │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express.js Server                         │
│                      (server.js)                             │
│                      Port: 5000                              │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │             Routes Layer                             │   │
│  │          (/routes/userRoutes.js)                     │   │
│  │  POST   /api/users/register                          │   │
│  │  GET    /api/users                                   │   │
│  │  GET    /api/users/:id                               │   │
│  │  PUT    /api/users/:id                               │   │
│  │  DELETE /api/users/:id                               │   │
│  └───────────────────┬──────────────────────────────────┘   │
│                      │                                        │
│  ┌───────────────────▼──────────────────────────────────┐   │
│  │          Controllers Layer                           │   │
│  │      (/controllers/userController.js)                │   │
│  │  • registerUser()                                    │   │
│  │  • getAllUsers()                                     │   │
│  │  • getUserById()                                     │   │
│  │  • updateUser()                                      │   │
│  │  • deleteUser()                                      │   │
│  └───────────────────┬──────────────────────────────────┘   │
│                      │                                        │
│  ┌───────────────────▼──────────────────────────────────┐   │
│  │           Models Layer                               │   │
│  │         (/models/User.js)                            │   │
│  │  • User Schema                                       │   │
│  │  • Validations                  ──────────────────┐  │   │
│  │  • Pre-save Hooks (Bcrypt)  ┌─→ Password Hashing │  │   │
│  │  • Methods                   │   (bcrypt)         │  │   │
│  └───────────────────┬──────────┼────────────────────┘   │   │
│                      │          │                        │   │
│                      ▼          │                        │   │
│  ┌──────────────────────────────┴────────────────────┐   │   │
│  │           Error Handler Middleware                │   │   │
│  │       (/middleware/errorHandler.js)               │   │   │
│  │  • Catches all errors                             │   │   │
│  │  • Formats error responses                        │   │   │
│  │  • Returns proper HTTP status codes               │   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │    Database Configuration Layer                   │  │
│  │      (/config/database.js)                        │  │
│  │  • MongoDB connection setup                       │  │
│  │  • Mongoose configuration                         │  │
│  │  • Connection error handling                      │  │
│  └──────────────────┬─────────────────────────────┘  │
└─────────────────────┼────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 MongoDB Database                             │
│                  (MongoDB Atlas)                             │
│                                                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │  creators_platform Database                        │    │
│  │   └─ users Collection                              │    │
│  │      ├─ name (String)                              │    │
│  │      ├─ email (String, Unique)                     │    │
│  │      ├─ password (Hashed String - Bcrypt)          │    │
│  │      ├─ createdAt (Date)                           │    │
│  │      └─ updatedAt (Date)                           │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Request-Response Flow

### 1. Register User Request

```
Request:
POST /api/users/register
{
  "name": "John Creator",
  "email": "john@example.com",
  "password": "password123"
}
         │
         ▼
    [Routes]
    Route matches /register endpoint
         │
         ▼
    [Controller]
    registerUser() function
    • Validates input
    • Checks if email exists
    • Calls User.create()
         │
         ▼
    [Model]
    User.create() triggers:
    • Schema validation
    • Pre-save hook
    • Password hashing with bcrypt
         │
         ▼
    [Database]
    Stores hashed user in MongoDB
         │
         ▼
Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "John Creator",
    "email": "john@example.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
Note: Password is NOT included
```

### 2. Error Handling Flow

```
Request:
POST /api/users/register
{
  "name": "Duplicate",
  "email": "john@example.com"  // Already exists
}
         │
         ▼
    [Controllers]
    Check if user exists
    → Found existing user
         │
         ▼
    [Error Response]
    Return 400 status with error message
         │
         ▼
    [Error Handler Middleware]
    Catches and formats error
         │
         ▼
Response:
{
  "success": false,
  "message": "Email already registered"
}
Status: 400 Bad Request
```

## File Structure & Responsibilities

### `/config/database.js`
**Purpose**: Initialize MongoDB connection
**Key Functions**:
```javascript
connectDB() // Called in server.js
├─ Connect to MongoDB
├─ Handle success → Log connection
└─ Handle failure → Exit process
```

### `/models/User.js`
**Purpose**: Define user schema and validation
**Key Components**:
```javascript
userSchema
├─ name: Required, min 3 chars
├─ email: Required, unique, email format
├─ password: Required, hashed
├─ timestamps: createdAt, updatedAt
└─ Methods
   └─ matchPassword() // Compare password hash
└─ Pre-save Hooks
   └─ Hash password before saving
```

### `/controllers/userController.js`
**Purpose**: Business logic for all user operations
**Key Functions**:
```javascript
registerUser()    // POST - Create new user
getAllUsers()     // GET - Fetch all users
getUserById()     // GET - Fetch specific user
updateUser()      // PUT - Update user info
deleteUser()      // DELETE - Remove user
```

### `/routes/userRoutes.js`
**Purpose**: Map HTTP methods to controller functions
**Routes**:
```javascript
POST   /api/users/register  → registerUser()
GET    /api/users           → getAllUsers()
GET    /api/users/:id       → getUserById()
PUT    /api/users/:id       → updateUser()
DELETE /api/users/:id       → deleteUser()
```

### `/middleware/errorHandler.js`
**Purpose**: Centralized error handling
**Handles**:
- MongoDB validation errors
- Duplicate key errors
- Invalid ID format errors
- Generic server errors

### `/server.js`
**Purpose**: Initialize and start Express server
**Does**:
1. Load environment variables (dotenv)
2. Create Express app
3. Set up middleware (JSON parsing)
4. Connect to database
5. Register routes
6. Start listening on port

## Data Flow Examples

### Register User Flow (Success)
```
User Input
    ↓
Validation (name, email, password)
    ↓
Check email uniqueness (DB query)
    ↓
Create user object
    ↓
Hash password with bcrypt ← 10 salt rounds
    ↓
Save to MongoDB
    ↓
Remove password from response
    ↓
Return user data
```

### Get User by ID Flow
```
Request with ID
    ↓
Validate ID format (MongoDB ObjectID)
    ↓
Query database by ID
    ↓
Found?
  ├─ Yes → Select all fields except password
  │        Return user
  └─ No  → Return 404 error
```

### Update User Flow
```
Request with ID and update data
    ↓
Validate ID format
    ↓
Check if user exists
    ↓
If email updated:
  ├─ Check email not duplicate
  └─ Proceed if unique
    ↓
Update user object
    ↓
Save to database
    ↓
Return updated user
    ↓
Return response
```

### Delete User Flow
```
Request with ID
    ↓
Validate ID format
    ↓
Query database for user
    ↓
Found?
  ├─ Yes → Delete from database
  │        Return success message
  └─ No  → Return 404 error
```

## Technologies & Their Roles

| Technology | Role |
|------------|------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework routing & middleware |
| **MongoDB** | Document database |
| **Mongoose** | MongoDB object modeling |
| **bcrypt** | Password hashing & encryption |
| **dotenv** | Environment variable management |

## Security Flow

```
Password Security:
User submits password
    ↓
Password reaches server OVER HTTPS (in production)
    ↓
Never logged or stored as plain text
    ↓
Pre-save hook in User model triggers:
  - Generate salt (10 rounds)
  - Hash password with bcrypt
    ↓
Only hashed version stored in database
    ↓
User never exposed in API responses
    ↓
When authenticating (future):
  - Compare submitted password with hash
  - Use bcrypt.compare()
  - Returns true/false
```

## Error Handling Flow

```
Any Error Occurs
    ↓
Try-catch block catches it
    ↓
Error Handler Middleware processes it:
  ├─ ValidationError → Format validation messages
  ├─ CastError → Return "Invalid ID" message
  ├─ Duplicate Key → Return "Email in use" message
  └─ Generic Error → Return "Server Error"
    ↓
Proper HTTP Status Code
    ↓
Formatted JSON Response
    ↓
Sent to Client
```

## API Response Structure

### Success Response
```json
{
  "success": true,
  "message": "Operation completed",
  "data": {
    "_id": "...",
    "name": "...",
    "email": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Validation Checks

Each layer performs validation:

```
API Layer (Express):
  └─ Content-Type header check
  └─ Basic request structure

Route Layer:
  └─ Passes to controller

Controller Layer:
  └─ Required field presence
  └─ Field format validation
  └─ Business logic checks (email uniqueness)

Model Layer:
  └─ Schema validation
  └─ Type checking
  └─ Custom validators (email regex)

Database Layer:
  └─ Unique index enforcement
  └─ Constraint validation
```

## Environment Variables

```
.env file contains:
├─ PORT (server port)
└─ MONGODB_URI (database connection string)
    ├─ Username
    ├─ Password
    ├─ Cluster
    └─ Database name
```

## Connection Lifecycle

```
Server Start
    ↓
Load .env file
    ↓
Call connectDB()
    ↓
Mongoose connects to MongoDB
    ↓
Connected?
  ├─ Yes → ✅ Ready for requests
  └─ No  → ❌ Process exits
```

## Request Processing Timeline

```
Request arrives
│
└─ Express middleware processes
│  ├─ Parse JSON
│  └─ Extract data
│
└─ Route matches
│  └─ Controller function called
│
└─ Controller processes
│  ├─ Validate input
│  ├─ Query database
│  └─ Format response
│
└─ Response sent back to client
```

## Scalability Considerations

The current architecture can be extended with:

```
Current:
├─ Single User model
├─ Basic CRUD operations
└─ No authentication

Future Additions:
├─ User authentication (JWT)
├─ More models (Creator, Post, Comment)
├─ Pagination for lists
├─ Search & filtering
├─ Rate limiting
├─ Caching (Redis)
├─ File uploads (AWS S3)
└─ Email notifications
```

## Debugging & Monitoring

You can add debugging at each layer:

```javascript
// Config
console.log(`Connected to: ${conn.connection.host}`)

// Routes
console.log(`Request to ${req.path}`)

// Controllers
console.log(`Processing: ${req.body}`)

// Models
console.log(`Saving user: ${this.email}`)

// Database
// MongoDB Atlas dashboard shows queries
```

---

This architecture follows **MVC (Model-View-Controller)** pattern and best practices for scalable Node.js applications!
