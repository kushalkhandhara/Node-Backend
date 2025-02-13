# User Authentication API

This is a **Node.js & Express** API that provides user authentication features such as **user registration, login, and search**. It uses **MongoDB** (via Mongoose) for database operations and **JWT** for authentication.

## 🚀 Features
- **User Registration** with hashed passwords
- **User Login** with JWT authentication
- **Search Users** by email or username (only for logged-in users)
- Secure password storage using **bcrypt.js**
- Environment variable support using **dotenv**

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt.js

## 📌 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo-url.git
cd your-project-name
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Create `.env` File
Inside the root folder, create a **.env** file and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_jwt_key
```

### 4️⃣ Start the Server
```sh
npm start
```
The server will start on **http://localhost:5000**.

## 📌 API Endpoints

### **1️⃣ Register User**
**Endpoint:** `POST /api/auth/register`
- **Request Body:**
```json
{
    "userName": "john_doe",
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "12345678",
    "gender": "Male",
    "dateOfBirth": "1995-06-15",
    "country": "USA"
}
```
- **Response:**
```json
{
    "success": true,
    "message": "Registration Successful"
}
```

---

### **2️⃣ Login User**
**Endpoint:** `POST /api/auth/login`
- **Request Body:**
```json
{
    "email": "john@example.com",
    "password": "12345678"
}
```
- **Response:**
```json
{
    "success": true,
    "message": "Login Successfully",
    "user": {
        "userName": "john_doe",
        "email": "john@example.com",
        "id": "6543abcdef1234567890"
    }
}
```

---

### **3️⃣ Search User (Authenticated)**
**Endpoint:** `POST /api/user/search`
- **Headers:**
```json
{
    "Authorization": "Bearer your_jwt_token"
}
```
- **Request Body:**
```json
{
    "query": "john_doe"
}
```
- **Response:**
```json
{
    "success": true,
    "user": {
        "userName": "john_doe",
        "email": "john@example.com",
        "fullname": "John Doe",
        "gender": "Male",
        "dateOfBirth": "1995-06-15",
        "country": "USA"
    }
}
```

## 🔒 Authentication
- The **login API** generates a JWT token, which must be sent in the `Authorization` header for protected routes.
- Example **header format**:
```json
{
    "Authorization": "Bearer your_jwt_token"
}
```

## 📜 License
This project is **MIT Licensed**. Feel free to use and modify it as needed.

## 💡 Contributors
- **Your Name** ([GitHub](https://github.com/kushalkhandhara))

---
🚀 **Happy Coding!**
