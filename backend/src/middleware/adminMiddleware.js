import { ENV } from "../lib/env.js";

/**
 * Middleware to restrict route access to Admin users or requests with a valid x-admin-key header.
 */
export const requireAdmin = (req, res, next) => {
  try {
    // Check for admin secret key header (useful for CLI/seed scripts or internal admin calls)
    const adminKey = req.headers["x-admin-key"];
    if (adminKey && process.env.ADMIN_SECRET && adminKey === process.env.ADMIN_SECRET) {
      return next();
    }

    // Check if user is authenticated and has admin role
    if (req.user && req.user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      message: "Forbidden - Admin access required.",
    });
  } catch (error) {
    console.error("Error in requireAdmin middleware:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
