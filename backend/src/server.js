import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/authRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import executeRoute from "./routes/executeRoute.js";
import aiRoute from "./routes/aiRoute.js";
import interviewRoutes from "./routes/interviewRoute.js";
import resumeRoutes from "./routes/resumeRoute.js";
import problemRoutes from "./routes/problemRoute.js";

// Initialize BullMQ Queues & Workers
import "./queues/emailQueue.js";
import "./queues/resumeQueue.js";
import "./queues/streamQueue.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true,
  }
});
app.set("trust proxy", 1); // allow secure cookies behind Railway/Render proxy

const __dirname = path.resolve();

// middleware
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ 
  origin: ENV.CLIENT_URL, 
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/execute", executeRoute);
app.use("/api/ai", aiRoute);
app.use("/api/interviews", interviewRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/problems", problemRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const sessionStates = new Map();

io.on("connection", (socket) => {
  socket.on("join_session", (sessionId) => {
    socket.join(sessionId);

    // Send current state to the joining user
    if (sessionStates.has(sessionId)) {
      const state = sessionStates.get(sessionId);
      if (state.language) socket.emit("language_change", { language: state.language });
      if (state.code) socket.emit("code_change", { code: state.code });
      if (state.problemTitle) socket.emit("problem_change", { problemTitle: state.problemTitle });
      if (state.isSolved) socket.emit("problem_solved", { isSolved: state.isSolved });
    }
  });

  socket.on("problem_change", ({ sessionId, problemTitle }) => {
    if (!sessionStates.has(sessionId)) sessionStates.set(sessionId, {});
    sessionStates.get(sessionId).problemTitle = problemTitle;
    sessionStates.get(sessionId).isSolved = false; // reset on problem change
    socket.to(sessionId).emit("problem_change", { problemTitle });
  });

  socket.on("problem_solved", ({ sessionId, isSolved }) => {
    if (!sessionStates.has(sessionId)) sessionStates.set(sessionId, {});
    sessionStates.get(sessionId).isSolved = isSolved;
    socket.to(sessionId).emit("problem_solved", { isSolved });
  });

  socket.on("code_change", ({ sessionId, code }) => {
    if (!sessionStates.has(sessionId)) sessionStates.set(sessionId, {});
    sessionStates.get(sessionId).code = code;
    socket.to(sessionId).emit("code_change", { code });
  });

  socket.on("language_change", ({ sessionId, language }) => {
    if (!sessionStates.has(sessionId)) sessionStates.set(sessionId, {});
    sessionStates.get(sessionId).language = language;
    socket.to(sessionId).emit("language_change", { language });
  });

  socket.on("cursor_change", ({ sessionId, cursor }) => {
    socket.to(sessionId).emit("cursor_change", { cursor });
  });
});

const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
