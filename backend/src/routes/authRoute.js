import express from "express";
import { 
  register, 
  login, 
  logout, 
  getMe, 
  verifyEmail, 
  resendOtp, 
  updateProfile, 
  requestAccountDeletion, 
  confirmAccountDeletion,
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { authRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);
router.post("/verify-email", authRateLimiter, verifyEmail);
router.post("/resend-otp", authRateLimiter, resendOtp);

// OAuth Endpoints
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/github", githubAuth);
router.get("/github/callback", githubCallback);

router.put("/profile", protectRoute, updateProfile);
router.post("/delete-request", protectRoute, requestAccountDeletion);
router.delete("/account", protectRoute, confirmAccountDeletion);

export default router;
