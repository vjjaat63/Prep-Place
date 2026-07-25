import { RateLimiterRedis } from "rate-limiter-flexible";
import { redisClient } from "../lib/redis.js";

// Helper function to create a middleware from a limiter
const createRateLimiterMiddleware = (limiter, customMessage) => {
  return (req, res, next) => {
    if (!redisClient) {
      // If Redis isn't configured, silently bypass (or you could throw an error in strict prod)
      return next();
    }
    
    // Use IP as the key. If user is logged in, use their ID for stricter limits
    const key = req.user ? req.user._id.toString() : req.ip;

    limiter.consume(key)
      .then(() => {
        next();
      })
      .catch((rejRes) => {
        const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
        res.set("Retry-After", String(secs));
        res.status(429).json({ 
          message: customMessage || "Too many requests. Please try again later.",
          retryAfter: secs
        });
      });
  };
};

// --- Define Limiters ---

let authLimiter;
let aiLimiter;
let globalLimiter;

if (redisClient) {
  authLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rl_auth",
    points: 5, // 5 requests
    duration: 15 * 60, // per 15 minutes by IP
    blockDuration: 15 * 60, // Block for 15 minutes if consumed more than points
  });

  aiLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rl_ai",
    points: 10, // 10 requests
    duration: 60, // per 1 minute by user
  });

  globalLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rl_global",
    points: 100, // 100 requests
    duration: 60, // per 1 minute by IP
  });
}

// --- Export Middlewares ---

export const authRateLimiter = createRateLimiterMiddleware(
  authLimiter, 
  "Too many authentication attempts. Please try again in 15 minutes."
);

export const aiRateLimiter = createRateLimiterMiddleware(
  aiLimiter, 
  "Too many AI requests. Please wait a minute before trying again to prevent quota exhaustion."
);

export const globalRateLimiter = createRateLimiterMiddleware(
  globalLimiter,
  "Too many requests from this IP. Please try again shortly."
);
