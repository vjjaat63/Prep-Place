import express from "express";
import { 
  createInterview, 
  continueInterview, 
  endInterview, 
  getInterviewHistory, 
  getInterviewById, 
  deleteInterview 
} from "../controllers/interviewController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", protectRoute, aiRateLimiter, createInterview);
router.post("/:id/message", protectRoute, aiRateLimiter, continueInterview);
router.post("/:id/end", protectRoute, aiRateLimiter, endInterview);
router.get("/", protectRoute, getInterviewHistory);
router.get("/:id", protectRoute, getInterviewById);
router.delete("/:id", protectRoute, deleteInterview);

export default router;
