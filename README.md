# 📝 Live Task Share - Task Management Web Application

**Live URL:** [https://live-task-share-kruthika-ks-projects.vercel.app](https://live-task-share-kruthika-ks-projects.vercel.app)

A full-stack task management application built using the **MERN stack** with real-time features like task collaboration and updates. This application allows users to register, log in, create, update, and delete tasks, and also receive real-time updates on task status via sockets.

---

## 🎥 Demo Videos

- 🔷 **Frontend Demo Video:** [Watch here]()
- 🔷 **Backend Demo Video:** [Watch here]([https://your-demo-link-backend.com](https://github.com/Kruthii02/live-task-share/blob/main/Screen%20Recording%202025-07-02%20073933.mp4))

---

## 🧠 Architecture Diagram

![Architecture Diagram](C:\Users\kruth\Downloads\Architecture.png.jpg)

> ✅ Make sure to add the `architecture.png` inside a folder named `assets` in your repo.

---

## ⚙️ Tech Stack

**Frontend**: React.js, TailwindCSS, Axios, React Router  
**Backend**: Node.js, Express.js  
**Database**: MongoDB  
**Authentication**: JWT + OAuth (Google)  
**Real-time Communication**: Socket.IO  
**Deployment**: Vercel (Frontend) & Render/Heroku (Backend)  
**Version Control**: GitHub  

---

## 🔁 Application Workflow

### 🧩 1. **Authentication**
- New users can sign up using email/password or Google OAuth.
- JWT tokens are used to securely authenticate and authorize users.

### ✅ 2. **Task Creation & Management**
- Authenticated users can **create**, **edit**, **delete**, and **mark tasks as complete**.
- Tasks are stored in MongoDB and fetched using RESTful APIs from the backend.

### 🔄 3. **Real-time Task Updates**
- Socket.IO enables real-time syncing of task updates across multiple clients.
- When a task is added or modified, all connected clients receive the update instantly.

### 🔐 4. **Role-based Access**
- Users can manage their tasks privately.
- (Optional) Admin or shared task boards can be enabled for group collaboration.

### ☁️ 5. **Deployment**
- **Frontend** is deployed on Vercel.
- **Backend** is hosted on Render (or any other Node.js hosting platform).
- Environment variables are managed through `.env` for both frontend and backend.

---

## 📂 Project Structure

```bash
📦 root
├── client/               # React frontend
│   ├── public/
│   └── src/
├── server/               # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── .env
├── README.md
└── package.json
🛠️ Setup Instructions
Clone the repository

git clone https://github.com/your-username/live-task-share.git
Frontend Setup

cd client
npm install
npm start
Backend Setup

cd server
npm install
npm start
Environment Variables
Create .env files in both client and server with the required API keys and secrets.

🧑‍💻 Author
Kruthika K
👩‍💻 Passionate about MERN stack and real-time applications
📫 LinkedIn | GitHub
*This project is a part of a hackathon run by [https://www.katomaran.com](https://www.katomaran.com)*
