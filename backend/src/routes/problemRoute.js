import express from "express";
import {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController.js";
import { protectRoute } from "../middleware/protectRoute.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Read Routes (Cached via Redis)
router.get("/", getAllProblems);
router.get("/:id", getProblemById);

// Admin-Protected Write Routes (Invalidates Redis Cache)
// Note: Allows access via JWT user (with role === 'admin') OR via x-admin-key header
router.post("/", (req, res, next) => {
  // If request has admin key header, skip protectRoute, otherwise protectRoute first
  if (req.headers["x-admin-key"]) return requireAdmin(req, res, next);
  return protectRoute(req, res, () => requireAdmin(req, res, next));
}, createProblem);

router.put("/:id", (req, res, next) => {
  if (req.headers["x-admin-key"]) return requireAdmin(req, res, next);
  return protectRoute(req, res, () => requireAdmin(req, res, next));
}, updateProblem);

router.delete("/:id", (req, res, next) => {
  if (req.headers["x-admin-key"]) return requireAdmin(req, res, next);
  return protectRoute(req, res, () => requireAdmin(req, res, next));
}, deleteProblem);

export default router;
