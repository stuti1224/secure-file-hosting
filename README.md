# Secure File Hosting
Project setup started

# Progress Log
Project setup started
Backend server running
MongoDB connected successfully
Initial commits completed after backend–database connection
Installed and configured Multer for handling file uploads
Installed bcryptjs for password hashing
Implemented JWT authentication for login & protected routes
Created User and File models
Added routes for authentication (register, login)
Added routes for file upload, fetch, download, delete
Frontend setup completed using React
Integrated frontend with backend using Axios
Implemented Register, Login, and Dashboard pages
File upload, delete, download, and listing fully functional
Added Public Files and My Files sections
Application working end-to-end

# Features Implemented
Authentication
User Registration
User Login
Password hashing using bcryptjs
JWT token generation and verification
Protected routes
File Handling
Upload files with public/private privacy settings
Fetch logged-in user's files
Fetch publicly available files
Download files
Delete files
Auto-refresh file list after upload/delete
Frontend
React components: Register, Login, Dashboard
Axios API integration
Protected dashboard (redirects to login if no token)
File sharing link displayed
Clean & simple UI

# Tech Stack

Frontend
React.js
Axios
React Router

Backend
Node.js
Express.js
MongoDB + Mongoose
Multer (file uploads)
JWT (authentication)
bcryptjs
dotenv

# How to run the project

cd backend
npm start
Runs on:
http://localhost:4000

cd frontend
npm start
Runs on:
http://localhost:3000

# Folder structure

secure-file-hosting/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── api/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md

# API endpoints

Auth routes
| Method | Endpoint           | Description |
| ------ | ------------------ | ----------- |
| POST   | /api/auth/register | Create user |
| POST   | /api/auth/login    | Login user  |

File Routes
| Method | Endpoint                | Description      |
| ------ | ----------------------- | ---------------- |
| POST   | /api/files/upload       | Upload file      |
| GET    | /api/files              | Get my files     |
| GET    | /api/files/public       | Get public files |
| GET    | /api/files/download/:id | Download file    |
| DELETE | /api/files/:id          | Delete file      |


Status

Fully functional
Frontend + Backend connected end-to-end
File upload/download/delete is in the file and in progress
Authentication secured