# API Endpoints Documentation

## User Management Endpoints

### 1. Register User
**Endpoint**: `POST /api/users/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

Response (201 Created):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-09T10:30:00.000Z",
    "updatedAt": "2024-03-09T10:30:00.000Z"
  }
}
```

### 2. Get All Users
**Endpoint**: `GET /api/users`

Response (200 OK):
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-03-09T10:30:00.000Z",
      "updatedAt": "2024-03-09T10:30:00.000Z"
    }
  ]
}
```

### 3. Get User by ID
**Endpoint**: `GET /api/users/:id`

Response (200 OK):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-03-09T10:30:00.000Z",
    "updatedAt": "2024-03-09T10:30:00.000Z"
  }
}
```

### 4. Update User
**Endpoint**: `PUT /api/users/:id`

Request Body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

Response (200 OK):
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2024-03-09T10:30:00.000Z",
    "updatedAt": "2024-03-09T10:35:00.000Z"
  }
}
```

### 5. Delete User
**Endpoint**: `DELETE /api/users/:id`

Response (200 OK):
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {}
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Error message describing the issue"
}
```

## Status Codes Reference

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Client error |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |
