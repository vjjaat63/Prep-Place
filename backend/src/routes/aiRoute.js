import express from "express";
import { generateCodeReview } from "../controllers/aiController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/review", protectRoute, aiRateLimiter, generateCodeReview);

export default router;
