﻿# Almashines-Technology-Url-Shortner
# URL Shortener with Advanced Features

A full-stack URL shortener application built with **MERN stack** (MongoDB, Express.js, React, Node.js) featuring URL shortening, redirection, expiration, and QR code generation. The project includes **user authentication** (signup, login), **analytics tracking** (total clicks, unique clicks, location, time tracking, etc.), and **password-protected URLs**.

---

## Features

### 🌐 URL Shortener:
- Shorten long URLs with ease.
- Allow User to Enter there own **Custom-URL** and genereate short URl based on that.
- Allows anonymous users to shorten URLs but restricts analytics access to authenticated users.
- Supports **URL expiration** where users can set an expiry date for shortened URLs.
- **QR code generation** for each shortened URL.

### 🔐 User Authentication:
- **Signup** and **login** functionality using JWT tokens.
- Uses `localStorage` to store authentication tokens for session management.
- Protected routes that ensure only authenticated users can access analytics.

### 📊 URL Analytics:
- Logged-in users can view detailed analytics on the URLs they've created.
- **Analytics data** includes:
  - Total clicks
  - Unique clicks
  - User location (geo-tracking)
  - Time tracking (click history over time with a bar graph)
  - Top-performing day

### 📅 URL Expiration:
- Option to set expiration dates for URLs.
- Shortened URLs expire automatically after a user-defined time.

---

### Flowchart
![alt text](Screenshots/Flowchart.png)

## Tech Stack

### Frontend:
- **React** (with Vite) for building the user interface.
- **React Router** for navigation and route protection.
- **React Toastify** for notifications (e.g., success/error messages).
- **localStorage** for storing JWT tokens.

### Backend:
- **Node.js** with **Express.js** for building REST APIs.
- **MongoDB** for database storage (including user data and URLs).
- **Mongoose** for MongoDB object modeling.
- **Bcryptjs** for password hashing.
- **JWT (jsonwebtoken)** for user authentication and secure access.

---

## Installation

### Prerequisites:
Make sure you have the following installed:
- **Node.js** (>= 14.x)
- **MongoDB** (>= 4.x)

### Backend Setup:
1. Clone the repository:
    ```bash
    git clone https://github.com/Vikas-Yadav-79/Almashines-Technology-Url-Shortner.git

   
    ```

2. Install backend dependencies:
    ```bash
    cd backend

    npm install
    ```

3. Create a `.env` file in the root folder and add the following environment variables:
    ```bash
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your-Mongo-uri
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup:
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm run dev
    ```

---

## API Endpoints

### **User Authentication:**
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login a user

### **URL Shortening:**
- `POST /api/url/shorten` - Shorten a new URL
- `GET /api/url/:shortId` - Redirect to the original URL

### **Analytics:**
- `GET /api/url/analytics/:shortId` - Get analytics for a specific shortened URL (requires authentication)

---

## How to Use

1. **Register** as a user or **login** if you already have an account.
2. **Shorten URLs** anonymously or as a logged-in user.
3. **View analytics** for your shortened URLs after logging in.
4. Set an **expiration date** for your URLs if required.
5. You can use the **QR code** for easy sharing of shortened URLs.

---

## Future Improvements
- Integrate **email notifications** for URL expiration.
- Add **more detailed analytics** like device tracking.
- Implement **WebSockets** for real-time URL click updates.

---

## Screenshots
### Home Page
![Home Page](Screenshots/image.png)
### Login Page
![alt text](Screenshots/image-1.png)
### SignUp Page
![alt text](Screenshots/image-2.png)
### URL Shortening With Expiration Date and Custom URL
![alt text](Screenshots/image-3.png)
### URL Shortening With Password Protection
![alt text](Screenshots/image-8.png)
### User Accessing Analytics Without Login
![alt text](Screenshots/image-4.png)
### Successful Login
![alt text](Screenshots/image-5.png)
### Analytics Page
![alt text](Screenshots/image-6.png)
![alt text](Screenshots/image-7.png)


## Author

**Vikas Yadav** - [GitHub](https://github.com/Vikas-Yadav-79)
