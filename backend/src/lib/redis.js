import Redis from "ioredis";
import { ENV } from "./env.js";

let redisClient = null;

try {
  if (!ENV.REDIS_URL) {
    console.warn("⚠️ REDIS_URL is missing. Redis rate limiting and queues will run in fallback mode.");
  } else {
    redisClient = new Redis(ENV.REDIS_URL, {
      maxRetriesPerRequest: 3,
    });

    redisClient.on("error", (err) => {
      console.error("❌ Redis connection error:", err.message);
    });

    redisClient.on("connect", () => {
      console.log("✅ Connected to Redis");
    });
  }
} catch (error) {
  console.error("❌ Failed to initialize Redis:", error.message);
}

export const getBullMQConnection = () => {
  if (!ENV.REDIS_URL) return null;
  try {
    return new Redis(ENV.REDIS_URL, {
      maxRetriesPerRequest: null, // Required by BullMQ
      enableReadyCheck: false,
    });
  } catch (err) {
    console.error("❌ Failed to create BullMQ Redis connection:", err.message);
    return null;
  }
};

export { redisClient };

