import { redisClient } from "./redis.js";
import bcrypt from "bcryptjs";

// In-memory fallback if Redis is temporarily offline or disconnected
const memoryStore = new Map();

const OTP_TTL = 600; // 10 minutes (in seconds)

/**
 * Save OTP in Redis with 10-minute TTL (EX 600)
 * @param {string} type - 'verify' or 'delete'
 * @param {string} identifier - User email or User ID
 * @param {string} rawOtp - Plaintext 6-digit OTP
 */
export const saveOTP = async (type, identifier, rawOtp) => {
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(rawOtp, salt);
  const redisKey = `otp:${type}:${identifier.toLowerCase()}`;

  if (redisClient) {
    try {
      await redisClient.set(redisKey, hashedOtp, "EX", OTP_TTL);
      console.log(`[Redis OTP] Saved '${type}' OTP for '${identifier}' (TTL: ${OTP_TTL}s)`);
      return;
    } catch (err) {
      console.warn("[Redis OTP] Redis write error, using memory fallback:", err.message);
    }
  }

  // Fallback to in-memory Map
  memoryStore.set(redisKey, {
    hashedOtp,
    expiresAt: Date.now() + OTP_TTL * 1000,
  });
  console.log(`[Memory OTP] Saved '${type}' OTP fallback for '${identifier}'`);
};

/**
 * Verify OTP from Redis
 * @param {string} type - 'verify' or 'delete'
 * @param {string} identifier - User email or User ID
 * @param {string} inputOtp - Plaintext 6-digit OTP entered by user
 * @returns {Promise<{ valid: boolean, message?: string }>}
 */
export const verifyOTP = async (type, identifier, inputOtp) => {
  const redisKey = `otp:${type}:${identifier.toLowerCase()}`;
  let storedHashedOtp = null;

  if (redisClient) {
    try {
      storedHashedOtp = await redisClient.get(redisKey);
    } catch (err) {
      console.warn("[Redis OTP] Redis read error:", err.message);
    }
  }

  // Fallback check if not found in Redis
  if (!storedHashedOtp && memoryStore.has(redisKey)) {
    const item = memoryStore.get(redisKey);
    if (item.expiresAt > Date.now()) {
      storedHashedOtp = item.hashedOtp;
    } else {
      memoryStore.delete(redisKey);
    }
  }

  if (!storedHashedOtp) {
    return { valid: false, message: "OTP has expired or was not requested" };
  }

  const isOtpValid = await bcrypt.compare(inputOtp, storedHashedOtp);
  if (!isOtpValid) {
    return { valid: false, message: "Invalid OTP" };
  }

  // Delete OTP after successful verification
  await deleteOTP(type, identifier);
  return { valid: true };
};

/**
 * Delete OTP key manually from Redis / memory
 * @param {string} type - 'verify' or 'delete'
 * @param {string} identifier - User email or User ID
 */
export const deleteOTP = async (type, identifier) => {
  const redisKey = `otp:${type}:${identifier.toLowerCase()}`;
  if (redisClient) {
    try {
      await redisClient.del(redisKey);
    } catch (err) {
      console.warn("[Redis OTP] Redis delete error:", err.message);
    }
  }
  memoryStore.delete(redisKey);
};
