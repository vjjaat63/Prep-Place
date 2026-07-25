import Redis from "ioredis";
import { ENV } from "./env.js";

let redisClient = null;

try {
  if (!ENV.REDIS_URL) {
    console.warn("⚠️ REDIS_URL is missing. Redis rate limiting will fail if used.");
  } else {
    redisClient = new Redis(ENV.REDIS_URL, {
      maxRetriesPerRequest: 3,
    });

    redisClient.on("error", (err) => {
      console.error("❌ Redis connection error:", err);
    });

    redisClient.on("connect", () => {
      console.log("✅ Connected to Redis");
    });
  }
} catch (error) {
  console.error("❌ Failed to initialize Redis:", error);
}

export { redisClient };
