import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("🔐 protectRoute - Full auth header:", authHeader);
    console.log("🔐 protectRoute - JWT_SECRET exists:", !!ENV.JWT_SECRET);
    console.log("🔐 protectRoute - JWT_SECRET length:", ENV.JWT_SECRET?.length);
    
    if (!authHeader) {
      console.log("❌ protectRoute - No auth header provided");
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    
    if (!authHeader.startsWith("Bearer ")) {
      console.log("❌ protectRoute - Auth header doesn't start with Bearer:", authHeader.substring(0, 20));
      return res.status(401).json({ message: "Unauthorized - Invalid Bearer format" });
    }

    const token = authHeader.split(" ")[1];
    console.log("🔐 protectRoute - Extracted token (first 20 chars):", token?.substring(0, 20));

    let decoded;
    try {
      decoded = jwt.verify(token, ENV.JWT_SECRET);
      console.log("✅ protectRoute - Token verified, userId:", decoded.userId);
    } catch (jwtError) {
      console.log("❌ protectRoute - JWT verification failed:", jwtError.message);
      return res.status(401).json({ message: `Unauthorized - ${jwtError.message}` });
    }

    if (!decoded || !decoded.userId) {
      console.log("❌ protectRoute - Decoded token missing userId:", decoded);
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    console.log("🔐 protectRoute - User lookup result:", user ? "Found" : "Not Found");

    if (!user) {
      console.log("❌ protectRoute - User not found for userId:", decoded.userId);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    console.log("✅ protectRoute - Auth successful for user:", user._id);
    next();
  } catch (error) {
    console.log("💥 protectRoute - Unexpected error:", error.message);
    console.log("💥 Stack:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

