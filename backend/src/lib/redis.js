import Redis from "ioredis";
import { ENV } from "./env.js";

let redisClient = null;
let bullMQConnection = null;

try {
  if (!ENV.REDIS_URL) {
    console.warn("⚠️ REDIS_URL is missing. Redis rate limiting and queues will run in fallback mode.");
  } else {
    // Primary Redis Client for Caching, Rate-Limiting, and OTP Store
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

/**
 * Singleton BullMQ Redis connection to prevent connection leaks
 * reuse single client socket instead of spawning new sockets on every call
 */
export const getBullMQConnection = () => {
  if (!ENV.REDIS_URL) return null;
  if (!bullMQConnection) {
    try {
      bullMQConnection = new Redis(ENV.REDIS_URL, {
        maxRetriesPerRequest: null, // Required by BullMQ
        enableReadyCheck: false,
      });

      bullMQConnection.on("error", (err) => {
        console.error("❌ BullMQ Redis connection error:", err.message);
      });
    } catch (err) {
      console.error("❌ Failed to create BullMQ Redis connection:", err.message);
      return null;
    }
  }
  return bullMQConnection;
};

// Gracefully close sockets on process exit/reload (preventing connection leaks on nodemon restarts)
const cleanupRedis = async () => {
  if (redisClient) await redisClient.quit().catch(() => {});
  if (bullMQConnection) await bullMQConnection.quit().catch(() => {});
};

process.on("SIGINT", cleanupRedis);
process.on("SIGTERM", cleanupRedis);

export { redisClient };
