import express from "express";
import multer from "multer";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  analyzeResume,
  getResume,
  getResumeById,
  deleteResumeAnalysis,
  downloadResume
} from "../controllers/resumeController.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOCX files are allowed"), false);
    }
  }
});

router.post("/upload", protectRoute, upload.single("resume"), aiRateLimiter, analyzeResume);
router.get("/", protectRoute, getResume);
router.get("/download", protectRoute, downloadResume);
router.get("/:id", protectRoute, getResumeById);
router.delete("/:id", protectRoute, deleteResumeAnalysis);

// Error handling middleware for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File is too large. Max size is 5MB." });
    }
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

export default router;
