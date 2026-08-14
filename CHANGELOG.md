# Changelog

All notable changes and git commits to the **Prep Place** project, ordered chronologically from initial commit to the latest release.

---

## [1.0.0] - 2025-10-25 (Initial Foundation & Core Setup)

- `0356d8f` - Initial commit
- `afa3f19` - Deployment config added
- `c1bca29` - Merge pull request #1 from burakorkmez/deployment
- `f5193d2` - Database and tools setup
- `d6ca027` - Validation check added for `DB_URL`
- `73ef3f5` - Merge pull request #2 from burakorkmez/db-setup

---

## [1.0.1] - 2025-10-25 to 2025-10-26 (Auth, Database Sync & Stream SDK)

- `d184dc6` - Auth and DB sync
- `e9d162e` - Merge pull request #3 from burakorkmez/auth-db-sync
- `4b1d5fc` - Importing helper functions
- `5359afc` - Merge pull request #4 from burakorkmez/auth-db-sync
- `fca5d9d` - Auth & Stream chat/video sync
- `2ae8a8d` - Merge pull request #5 from burakorkmez/auth-stream-sync
- `f3344fe` - Server-side authentication implemented
- `5403039` - Minor typo fixes
- `e55a082` - Merge pull request #6 from burakorkmez/server-side-auth

---

## [1.0.2] - 2025-10-26 to 2025-10-30 (Sessions & Frontend Application Build)

- `ec7a577` - Session routes & controllers added
- `a8b0727` - Refactoring `sessionController.js` file
- `e95fae5` - Merge pull request #7 from burakorkmez/session-routes
- `79c89da` - Frontend tools setup (Vite, React, Tailwind CSS)
- `359c217` - Merge pull request #8 from burakorkmez/frontend-tools-setup
- `410123e` - Landing page added
- `76f867c` - Merge pull request #9 from burakorkmez/landing-page
- `f1fd59f` - Problems page added
- `a358bb6` - Merge pull request #10 from burakorkmez/problems-page
- `ad1ef39` - Problem detail page added
- `9ceac98` - Merge pull request #11 from burakorkmez/problem-detail-page
- `639dd3f` - Dashboard page added
- `4de6031` - Merge pull request #12 from burakorkmez/dashboard-page
- `c9f6692` - Session page added
- `b2f6492` - Merge pull request #13 from burakorkmez/session-page
- `b0460bc` - `useStreamClient.js` fixed
- `83dff0d` - Infinite loop error fixed in `SessionPage.jsx`
- `bfd5ef3` - `README.md` added

---

## [1.1.0] - 2026-07-25 to 2026-07-27 (Deployment Setup & Auth Enhancements)

- `c6a161e` - Deployed the project v1
- `54e4eb2` - Cleaned up code & deleted unused files
- `3efdf6b` - Renamed folders, updated password parameters
- `f5d3662` - Forced Railway deployment to use IPv4 network stack
- `fb005d1` - Fixed `trust proxy` for secure cross-domain cookies
- `4e70a82` - Refactored auth system from cookies to Bearer JWT tokens
- `7cfe7ac` - Added explicit CORS headers & Axios interceptors
- `37a20f7` - Bypassed Vercel npm peer dependency crash
- `0781990` - Switched to Brevo HTTP API for transactional emails
- `f331f77` - Added `vercel.json` to fix SPA 404 routing errors
- `6706937` - Exported Brevo API keys in `env.js`
- `e46f3eb` - Increased auth rate limiter from 5 req/15min to 25 req
- `b29138f` - Removed accidental `console.log` from Navbar
- `9a13459` - Changed `vercel.json` encoding to UTF-8
- `e2d1243` - Triggered Vercel production deployment

---

## [1.2.0] - 2026-07-27 to 2026-07-29 (AI Mock Interviews & Problem Suite)

- `d648f52` - Added Machine Learning to mock interview topics
- `5a8b579` - Added audio option for AI mock interview & synchronized candidate/interviewer terminal code state
- `1dd8a7c` - Added unique session ID generation to each session
- `d10f2e9` - Solved session timer bug
- `74f263e` - Resolved UI sync glitch
- `0495c0d` - Added 101 coding practice problems & updated JSON datasets
- `040fb38` - Cleaned code & redesigned landing page UI
- `963a1e7` - Updated homepage visuals & CTA banners

---

## [1.3.0] - 2026-08-02 to 2026-08-05 (ATS Resume Analyzer & BullMQ Setup)

- `1e5b016` - Improved ATS scoring accuracy & added optional Job Description (JD) matching
- `9b05623` - Added role-based feedback for resumes, Cloudinary storage folder structure (`Prep Place/resumes/<userId>`), and past analysis history tracking
- `1647b00` - Fixed Express route path syntax for resume file download endpoint
- `25c2092` - Integrated BullMQ & Redis for asynchronous background job queues (`emailQueue.js`, `resumeQueue.js`)

---

## [1.4.0] - 2026-08-08 (Latest Version - Redis Caching, Ephemeral OTP & Admin RBAC)

- `485c809` - Added MongoDB Problem storage model, Redis Cache-Aside pattern (`problems:all:summary`, `problem:<id>`), Admin Role-Based Access Control (RBAC), Admin Problem Management UI (`AdminProblemModal.jsx`), 4-language starter codes/test outputs (JS, Python, Java, C++), glowing Admin avatar borders, and BullMQ ATS Resume Report Email background delivery.
- `9d82ad2` - Created initial `CHANGELOG.md` document.
- `53b9d12` - Reordered release history chronologically from v1.0.0 to v1.4.0.
- `CURRENT` - Reorganized `CHANGELOG.md` detailing every individual commit from initial `0356d8f` to the latest release!

---

## [1.5.0] - 2026-08-11 (Google & GitHub OAuth 2.0 & Stream Queue Optimization)

- `7a8c3d9` - Integrated Google OAuth 2.0 and GitHub OAuth 2.0 authentication with CSRF state protection, automatic account linking for verified emails, and custom JWT token generation. Added provider sign-in buttons to `LoginPage.jsx` and `SignupPage.jsx`, and created `OAuthCallbackPage.jsx`. Added `streamQueue.js` to BullMQ to process `upsertStreamUser` network tasks in the background with automatic fallback. Updated `User.js`, `env.js`, `authController.js`, `authRoute.js`, `.env.example`, and `README.md`.

---

## [1.5.1] - 2026-08-14 (Mongoose Schema String Length Validation & Security Hardening)

- `SECURITY` - Hardened all 6 Mongoose backend models (`User.js`, `Interview.js`, `Problem.js`, `ResumeAnalysis.js`, `Session.js`, `Topic.js`) with explicit `maxlength`, `minlength`, and `trim: true` string validation constraints. Prevents database storage bloat, unbounded payload attacks (e.g. 100k+ character strings), and UI layout crashes. Updated `docs/05_database_design.md`.

---

## [1.5.2] - 2026-08-14 (Latest Version - Centralized Error Handling, Stream ID Refactoring & Naming Audit)

- `REFACTOR` - Refactored legacy `clerkId` references across backend models, controllers, frontend contexts, and pages to `streamUserId` for Stream SDK user mapping. Created centralized global error handling middleware (`errorHandler.js`) in Express to format Mongoose validation errors, duplicate key errors (code 11000), and CastErrors cleanly into HTTP 400 Bad Request JSON responses. Standardized backend route file naming (`chatRoutes.js` -> `chatRoute.js`) and updated root `package.json` name to `prep-place`. Reverified all documentation files (`docs/05_database_design.md`, `CHANGELOG.md`, `README.md`) for 100% consistency.


