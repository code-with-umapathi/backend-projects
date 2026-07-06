# User Management REST API

A production ready REST API built with Node.js, Express.js and MYSQL that demonstrates CRUD(Create, Read, Update, Delete)

## Features

- Create a new user
- Get all users
- Get a user by ID
- Update user information
- Delete a user
- Input validation
- Proper HTTP status codes
- Centralized error handling
- MYSQL database integration
- Controller AsyncHandler wrappper
- Custom error integration
- Enviornment variable configuration
- Services and Repository layer implemented
- MYSQL Dependencies handled in server.js
- Pool connection integrated

## Tech Stack

- Node.js
- Express.js
- MySQL
- dotenv

## Project Structure

```
src
├── controller
├── services
├── repositories
├── routes
├── middleware
├── config
├── utils
├── errors
├── app.js
└── server.js

```
## Database Schema

### Users Table

| Column | Type |
|---------|------|
| id | INT |
| name | VARCHAR(100) |
| email | VARCHAR(255) |

---

## API endpoints

### Create User

**POST** `/users`

Request

```json
{
    "name": "John Doe",
    "email": "john@example.com"
}

```
Success Response

**201 Created**

```json
{
    "message": "User created successfully",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
}

```
---

### Get All Users

**GET** `/users`

Success Response

**200 OK**

```json
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
]
```

---

### Get User By ID

**GET** `/users/:id`

Success Response

**200 OK**

---

### Update User

**PUT** `/users/:id`

Request

```json
{
    "name": "Updated Name",
    "email": "updated@example.com"
}
```

Success Response

**200 OK**

```json
{
    "message": "User updated successfully"
}
```

---

### Delete User

**DELETE** `/users/:id`

Success Response

**204 No Content**

---

## HTTP Status Codes

| Status | Description |
|---------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Installation

```bash
git clone https://github.com/code-with-umapathi/backend-projects.git
```

Install dependencies

```bash
npm install
```

Create environment file

```
PORT=3000

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=register

```

Run the application

```bash
npm run dev
```

---

## Testing APIs

Use Postman or Thunder Client.

Base URL

```
http://localhost:3000
```

---

## Learning Outcomes

- REST API Design
- Express Routing
- Controller-Service-Repository Pattern
- MySQL CRUD Operations
- Error Handling
- Environment Variables
- HTTP Status Codes
- Clean Project Architecture

---

## Future Improvements

- JWT Authentication
- Role-Based Authorization
- Refresh Tokens
- Pagination
- Search & Filtering
- Docker
- Swagger Documentation
- Unit Testing