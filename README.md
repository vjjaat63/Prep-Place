<h1 align="center">✨ Prep Place ✨</h1>

<p align="center">
  A full-stack technical interview platform that enables users to practice coding interviews through real-time collaborative coding, video interviews, secure code execution, AI-powered code reviews, and coding practice.
</p>

## 📸 Screenshot

![Project Screenshot](frontend/public/screenshot-for-readme.png)

## 🏷️ Badges

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![GitHub OAuth](https://img.shields.io/badge/GitHub_OAuth-181717?style=for-the-badge&logo=github&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Stream](https://img.shields.io/badge/Stream-005FFF?style=for-the-badge&logo=stream&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-2C2C32?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## 🚀 Live Demo

**Website:**
Coming Soon

**Demo Video:**
prep-place.vercel.app

## ❓ Why Prep Place?

Technical interviews are stressful, and preparing for them often requires juggling multiple tools: a video call app, a collaborative code editor, and a separate execution environment. Prep Place solves this fragmentation by providing an all-in-one platform for candidates and interviewers. It bridges the gap between practice and real-world interviews by offering realistic environments, instant execution feedback, and intelligent AI code reviews.

## 🌟 Features

- **AI Mock Interviewer & MCQ Quiz System**
  Practice technical interviews matching FAANG/MAANG standards in both **Conversational (Q&A)** and **MCQs (Multiple Choice)** formats. Supports **Multi-Domain** selection (`Core Subjects`, `Programming Languages`, `Applied Tech`, `HR & Soft Skills`), continuous MCQ streaming backed by a **2-Hour Redis TTL Cache** with $N-2$ look-ahead pre-fetching, **Skip Question** functionality, and targeted post-interview report cards with wrong-answer explanations. Supports Text and Voice AI modes.
- **Secure Code Execution**
  Compile and run code securely in multiple languages. Execution requests are safely proxied through the backend to the JDoodle API, preventing credential exposure.
- **Intelligent AI Code Reviews**
  Get immediate feedback powered by Google Gemini AI, which provides:
  - Time Complexity Analysis
  - Space Complexity Analysis
  - Optimization Suggestions
  - Best Practices
- **Robust Authentication, OAuth 2.0 & Role-Based Security**
  Supports Google OAuth 2.0 and GitHub OAuth 2.0 social sign-in with automatic account linking for verified emails and CSRF state validation. Also includes custom secure JWT authentication flow backed by MongoDB, featuring email OTP verification via Brevo API, secure password hashing with bcryptjs, and Admin Role-Based Access Control (RBAC).
- **Background Job Queue Optimization (BullMQ)**
  Asynchronous tasks like email dispatching, resume processing, and Stream user synchronization (`streamQueue`) are offloaded to BullMQ workers powered by Redis, ensuring ultra-fast HTTP response times for end users.
- **MongoDB Problem Database & Redis Cache-Aside**
  Coding practice problems are stored persistently in MongoDB and cached in Redis with a 1-hour TTL, serving high-speed responses and purging outdated cache automatically on admin updates.
- **Role-Tailored Resume Analyzer & Analysis History**
  Upload PDF/DOCX resumes, select a target job role (or use quick-select role chips), and get role-focused ATS scoring, targeted skill recommendations, section breakdown, and complete past analysis history with secure cloud file storage (`Prep Place/resumes/<userId>/`).
- **Profile Management**
  Users can manage their personal profiles and seamlessly upload avatars, leveraging Cloudinary for fast and secure image delivery (`Prep Place/avatars/`).
- **Solo Practice Mode**
  A dedicated environment filled with coding problems for individual practice when you aren't in a live interview room.

## 🛠️ Tech Stack

### Frontend
- **React** — UI library for building dynamic user interfaces.
- **Vite** — Blazing fast frontend build tool.
- **Tailwind CSS** — Utility-first framework for rapid and responsive styling.
- **Monaco Editor** — The code editor that powers VS Code, embedded in the browser.
- **Stream SDK** — Powers real-time video, audio, and chat rooms.
- **TanStack Query** — Efficient server-state management, data fetching, and caching.

### Backend
- **Node.js** — High-performance JavaScript runtime for the backend API.
- **Express** — Minimalist web framework for handling RESTful routes.
- **MongoDB & Mongoose** — NoSQL database and Object Data Modeling (ODM).
- **OAuth 2.0 (Google & GitHub)** — Secure third-party authentication with account linking.
- **Redis (ioredis)** — High-speed in-memory key-value cache and rate limiter.
- **BullMQ** — Distributed background job queue for processing emails, resumes, and Stream user syncs.
- **Google Gemini API** — Generative AI for automated code analysis and feedback.
- **JDoodle API** — Remote compiler API used for securely executing user code.
- **Cloudinary** — Cloud storage service for handling user profile images.
- **Brevo API** — Transactional email service for sending secure OTP verification emails.
- **JWT & bcryptjs** — Tools for stateless authentication and secure password hashing.

## 🏗️ System Architecture

```text
       Browser
          │
    React Frontend
          │
   Express Backend ──► Redis Cache / BullMQ
  ┌───────┼─────────┐
  │       │         │
  ▼       ▼         ▼
MongoDB Gemini   JDoodle
          │
          ▼
     Stream SDK
          │
          ▼
     Cloudinary
```

## 📁 Project Structure

```text
backend/
frontend/
README.md
```

## 🧪 Environment Variables

### Backend (`backend/.env`)

```env
PORT=3000
NODE_ENV=development
DB_URL=your_mongodb_connection_url
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_connection_url
GEMINI_API_KEY=your_gemini_api_key
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_verified_gmail_address
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JDOODLE_CLIENT_ID=your_jdoodle_client_id
JDOODLE_CLIENT_SECRET=your_jdoodle_client_secret

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000/api
VITE_STREAM_API_KEY=your_stream_api_key
```

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd prep-place
   ```

2. **Run the Backend:**
   ```bash
   cd backend
   npm install
   npm run seed:problems # Seeds coding problems into MongoDB and initializes Redis cache
   npm run dev
   ```

3. **Run the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🔌 API Overview

- `/api/auth` - Email/password registration, login, Google & GitHub OAuth 2.0 endpoints, profile updates, and OTP verification
- `/api/problems` - Coding problems management (MongoDB stored + Redis Cache-Aside, Admin write routes)
- `/api/chat` - Real-time chat functionality
- `/api/sessions` - Collaborative session management
- `/api/execute` - Proxies requests to JDoodle to securely compile and execute code
- `/api/ai` - Integrates with Google Gemini API for AI code reviews and feedback
- `/api/interviews` - Manages mock interviews and history
- `/api/resume` - Role-tailored ATS resume evaluation, Cloudinary asset streaming, history tracking, and download management

## 🧗 Challenges Faced

- **Securely hiding JDoodle credentials:** Ensured API keys aren't leaked to the client by routing all code execution requests securely through an Express proxy.
- **Synchronizing editor state:** Kept the Monaco Editor code perfectly synced between multiple participants without race conditions during live sessions.
- **Managing authentication flow:** Seamlessly coordinated JWT creation, secure HttpOnly cookie management, and email-based OTP verification.
- **Integrating AI responses:** Parsed and formatted Google Gemini's raw textual output reliably into structured JSON for frontend rendering.
- **Coordinating video and chat:** Managed the Stream SDK state alongside the complex Monaco Editor instance without causing UI lag or infinite re-renders.

## 🚀 Future Improvements

- Collaborative whiteboard
- Interview recording
- Contest mode
- AI interviewer
- Code playback

## 📄 License

MIT

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute to this project.

---

⭐ If you found this project helpful, consider giving it a star!
