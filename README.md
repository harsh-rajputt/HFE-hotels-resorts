# HFE Hotels & Resorts - Full Stack MERN Application

A modern, responsive hotel booking and management website built with the **MERN Stack** (MongoDB, Express, React, Node.js). This project features a public-facing website for guests and a secure Admin Dashboard for managing rooms, gallery, and inquiries.

## 🚀 Live Demo

- **Frontend (Vercel):** [https://hfe-hotels-resorts.vercel.app](https://hfe-hotels-resorts.vercel.app)
- **Backend (Render):** [https://hfe-hotels-resorts.onrender.com](https://hfe-hotels-resorts.onrender.com)

---

## ✨ Features

### Public Website
- **Dynamic Content**: View rooms, amenities, and gallery (images & videos).
- **Responsive Design**: Optimized for mobile, tablet, and desktop using Tailwind CSS.
- **Contact Form**: Direct inquiry form for users.
- **Navigation**: Smooth client-side routing with `react-router-dom`.

### Admin Dashboard (Protected)
- **Authentication**: Secure JWT-based login system (bcrypt password hashing).
- **Room Management**: Add, Edit, and Delete hotel rooms with details (Price, Amenities, etc.).
- **Gallery Manager**: Upload, view, and delete images/videos directly to Cloudinary.
- **Inquiry Management**: View messages submitted via the contact form.
- **Feedback**: Real-time uploading status and success/error notifications (React Hot Toast).

---

## 🛠 Tech Stack

### Frontend (Client)
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6)
- **State Management**: Context API (`AuthContext`)
- **Notifications**: React Hot Toast
- **HTTP Client**: Native Fetch API

### Backend (Server)
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **File Storage**: Cloudinary (via `multer-storage-cloudinary`)
- **Security**: CORS, Environment Variables (`dotenv`)

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Atlas Account (or local MongoDB)
- Cloudinary Account (for media uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/harsh-rajputt/HFE-hotels-resorts.git
cd HFE-hotels-resorts
```

### 2. Backend Setup
Navigate to the server folder and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Seed the Admin User:**
To create the initial admin account (`admin` / `adminpassword123`), run:
```bash
node seedAdmin.js
```

Start the Backend Server:
```bash
npm start
# or for development with auto-restart
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client folder, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client/` directory:
```env
# For local development
VITE_API_URL=http://localhost:5000/api

# For production (Vercel)
# VITE_API_URL=https://your-backend-url.onrender.com/api
```

Start the Frontend Development Server:
```bash
npm run dev
```

Visit `http://localhost:5173` to view the app!

---

## 🔒 Environment Variables Reference

| Variable | Description | Location |
| :--- | :--- | :--- |
| `MONGODB_URI` | MongoDB connection string | Server `.env` |
| `JWT_SECRET` | Secret key for signing JWT tokens | Server `.env` |
| `CLOUDINARY_...` | Keys for connecting to Cloudinary | Server `.env` |
| `VITE_API_URL` | URL of the backend API (e.g., localhost or Render URL) | Client `.env` |

---

## 📦 Deployment Guide

### Backend (Render/Heroku)
1.  Push code to GitHub.
2.  Connect repository to **Render** (Web Service).
3.  Set Root Directory to `server`.
4.  Add Environment Variables from your local `.env`.
5.  Build Command: `npm install`
6.  Start Command: `node index.js`

### Frontend (Vercel/Netlify)
1.  Push code to GitHub.
2.  Connect repository to **Vercel**.
3.  Set Root Directory to `client`.
4.  Add `VITE_API_URL` environment variable (point to your deployed backend URL).
5.  Deploy!

---

## 🤝 Contributing
1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📝 License
This project is open source and available under the [MIT License](LICENSE).
