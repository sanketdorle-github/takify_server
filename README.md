# Backend - Taskify (Express.js API)

This is the backend API for the Taskify application, built using **Express.js** and **MongoDB**. It supports user authentication, task creation, updating, deletion, and pagination.

---

## 📦 Requirements

- Node.js (v16+ recommended)
- MongoDB (local or Atlas instance)
- `.env` file with your environment variables

---

## 🔧 Installation

1. **Clone the repository** (if you haven't already):

git clone https://github.com/your-username/taskify.git
cd taskify_server/backend
Install dependencies:


npm install
Create a .env file in the root of the backend/ folder and add:



PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key

note:serete will be attched in email



Run the server:


npm run dev
For development with live reloading:


npm run dev
📮 API Endpoints
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Log in and get a token
GET	/tasks	Get all tasks (with pagination, search, and filter)
POST	/tasks	Create a new task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task
📌 Notes
Protected routes require a Bearer Token in the Authorization header.

Make sure MongoDB is running locally or your Atlas cluster is connected.

CORS is enabled for frontend communication.

📁 Folder Structure
pgsql
Copy
Edit
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── .env
├── server.js
└── package.json
🧑‍💻 Author
Developed by Sanket Dorle


---
