# <img src="./frontend/public/chatter.svg" alt="Chatter Logo" width="42" align="center" /> Chatter


🟢 **[Live Demo: https://chatter-01ic.onrender.com](https://chatter-01ic.onrender.com)**

Chatter is a modern, full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. It features secure authentication, real-time messaging, profile customization, and a responsive UI.

## ✨ Features

- **Real-time Messaging**: Instant message delivery and receipt status using Socket.io.
- **Secure Authentication**: Robust user registration and login with JWT stored securely.
- **Profile Customization**: Users can update their profile pictures using Cloudinary.
- **Rate Limiting**: API endpoints are protected against abuse using Arcjet.
- **Email Notifications**: Integrated with Resend for transactional emails.
- **Beautiful UI**: A sleek, user-friendly, responsive interface built with Tailwind CSS and DaisyUI.
- **Global State Management**: Fast and scalable state handling with Zustand.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Routing**: React Router v7
- **State Management**: Zustand
- **Real-time**: Socket.io-client
- **Styling**: Tailwind CSS & DaisyUI
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io
- **Authentication**: JWT & Bcryptjs
- **Media Storage**: Cloudinary
- **Security**: Arcjet (Rate Limiting) & CORS
- **Email Services**: Resend

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed or configured:
- Node.js (v20 or higher)
- MongoDB Database
- Cloudinary Account
- Arcjet Account
- Resend Account (Optional: only used for sending welcome emails)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tejasri-T/chatter.git
   cd chatter
   ```

2. **Install dependencies:**
   The `npm run build` script defined in the root will install dependencies for both the frontend and the backend.
   ```bash
   npm run build
   ```

### Configuration

Create `.env` files in both the `frontend` and `backend` directories as needed.

**Backend (`backend/.env`):**
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ARCJET_KEY=your_arcjet_api_key
RESEND_API_KEY=your_resend_api_key # Optional
```

### Running the Application

1. **Start the Backend Server:**
   From the root directory:
   ```bash
   npm run start
   ```

2. **Start the Frontend Development Server:**
   Open a new terminal window:
   ```bash
   cd frontend
   npm run dev
   ```

   The application will be running on `http://localhost:5173`.

## 📁 Application Structure Highlights

- **`frontend/src/`**
  - `components/`: Reusable UI elements (like `ProfileHeader`, buttons).
  - `pages/`: Setup, Auth, and Dashboard routes.
  - `store/`: Zustand stores for client-side state.
  - `lib/`: Axios config and generic utils.
- **`backend/src/`**
  - `controllers/`: Request handlers and business logic.
  - `models/`: Mongoose database schemas.
  - `routes/`: Express endpoint definitions.
  - `lib/`: Database and third-party configuration (Cloudinary, Arcjet).

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Tejasri-T/chatter/issues) if you want to contribute.

## 📄 License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
