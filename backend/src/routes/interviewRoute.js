import express from "express";
import { 
  createInterview, 
  continueInterview, 
  endInterview, 
  getInterviewHistory, 
  getInterviewById, 
  deleteInterview,
  getInterviewTopics,
  addInterviewTopic,
  deleteInterviewTopic,
  getMCQState,
  submitMCQAnswer,
} from "../controllers/interviewController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Topic Management Endpoints
router.get("/topics", protectRoute, getInterviewTopics);
router.post("/topics", protectRoute, requireAdmin, addInterviewTopic);
router.delete("/topics/:id", protectRoute, requireAdmin, deleteInterviewTopic);

// MCQ Specific Endpoints
router.get("/:id/mcq", protectRoute, getMCQState);
router.post("/:id/mcq/answer", protectRoute, submitMCQAnswer);

// Interview Endpoints
router.post("/", protectRoute, aiRateLimiter, createInterview);
router.post("/:id/message", protectRoute, aiRateLimiter, continueInterview);
router.post("/:id/end", protectRoute, aiRateLimiter, endInterview);
router.get("/", protectRoute, getInterviewHistory);
router.get("/:id", protectRoute, getInterviewById);
router.delete("/:id", protectRoute, deleteInterview);

export default router;

