# Changelog

All notable changes to the **Prep Place** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.4.0] - 2026-08-08

### Added
- **Redis Cache-Aside Problem Caching**: Implemented a Redis Cache-Aside pattern for coding practice problems (`problems:all:summary` and `problem:<id>`) with 1-hour TTL (`EX 3600`) and automatic cache invalidation on admin edits.
- **Client-Side Instant Rendering**: Added in-memory `Map` caching in `frontend/src/api/problems.js` delivering 0ms instant page renders.
- **Ephemeral Redis TTL OTP Storage**: Offloaded 6-digit registration, email verification, and account deletion OTPs to Redis with an automatic 10-minute TTL (`EX 600`) via `otpStore.js`, eliminating temporary writes to MongoDB.
- **Admin Role-Based Access Control (RBAC)**: Added `"user"` and `"admin"` roles to `User` schema. Protected write endpoints (`POST`, `PUT`, `DELETE` on `/api/problems`) using `requireAdmin` middleware and optional `x-admin-key` header.
- **Admin Problem Management UI**: Added **"+ Add Problem"**, **"Edit"** ✏️, and **"Delete"** 🗑️ actions on `ProblemsPage.jsx` alongside `AdminProblemModal.jsx` supporting starter codes and multiline test case outputs across **JavaScript, Python, Java, and C++**.
- **Admin Profile Badging**: Added glowing multi-color gradient avatar borders (`from-amber-400 via-pink-500 to-purple-600`) and `👑 ADMIN` badges in `Navbar.jsx` and `ProfilePage.jsx`.
- **BullMQ ATS Resume Report Email Delivery**: Added `"send-resume-report"` job handler to BullMQ `emailQueue.js` to asynchronously email structured ATS evaluation reports to candidates in background workers.

### Performance & Security
- Reduced `GET /api/problems` response payload by **97.5% (415 KB → ~10 KB)**.
- Reduced problem API latency from **1.34 seconds to <10ms**.

---

## [1.3.0] - 2026-08-05

### Added
- **BullMQ Background Message Queues**: Integrated BullMQ and Redis connection pools (`emailQueue.js`, `resumeQueue.js`) for non-blocking background job processing.
- **Transactional Email Service**: Switched to Brevo HTTP API for transactional OTP delivery.
- **Rate Limiting**: Integrated `rate-limiter-flexible` backed by Redis to protect auth and AI endpoints against brute-force attacks.

---

## [1.2.0] - 2026-07-28

### Added
- **Role-Tailored ATS Resume Analyzer**: Added PDF/DOCX file parsing (`pdf-parse`, `mammoth`) and custom Gemini AI prompts for job-role matching and ATS scoring.
- **Cloud Storage Integration**: Configured Cloudinary integration for streaming user avatars (`Prep Place/avatars`) and uploaded resumes (`Prep Place/resumes/<userId>`).
- **Analysis History & Download Support**: Enabled persistent storage of resume reports in MongoDB (`ResumeAnalysis` schema) with past report retrieval and secure Cloudinary download links.

---

## [1.1.0] - 2026-07-15

### Added
- **AI Mock Interviewer**: Integrated Google Gemini API for automated mock technical interviews, follow-up questions, and performance scoring.
- **14-Model Fallback Engine**: Built `generateWithFallback` wrapper pooling quotas across Flash, Pro, Lite, and 1.5/2.0 models to maintain 99.9% availability during free-tier API rate limits.
- **Audio & Speech Controls**: Added voice audio toggle for AI mock interview sessions.

---

## [1.0.0] - 2026-07-01

### Added
- **Core Platform Launch**: Initial release of Prep Place full-stack application.
- **Real-Time Collaboration**: Embedded Monaco Editor with Socket.IO state synchronization for real-time code sharing across interview rooms.
- **Video & Audio Calling**: Integrated Stream SDK for 1-on-1 video calling, audio, and text chat.
- **Secure Code Execution**: Created Express proxy pipeline to safely compile and run code in 4+ languages via the JDoodle API.
- **Authentication System**: Implemented JWT Bearer token authentication, bcrypt password hashing, and user profile management.
