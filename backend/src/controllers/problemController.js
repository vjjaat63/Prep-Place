import mongoose from "mongoose";
import Problem from "../models/Problem.js";
import { redisClient } from "../lib/redis.js";

const CACHE_TTL = 3600; // 1 hour TTL in seconds

/**
 * Helper to safely delete keys matching a pattern or list from Redis
 */
const invalidateProblemCache = async (problemId = null) => {
  if (!redisClient) return;
  try {
    const keysToDelete = ["problems:all:summary", "problems:all:full"];
    if (problemId) {
      keysToDelete.push(`problem:${problemId}`);
    }
    await redisClient.del(...keysToDelete);
    console.log(`[Redis Cache] Invalidated cache keys: ${keysToDelete.join(", ")}`);
  } catch (err) {
    console.warn("[Redis Cache] Cache invalidation warning:", err.message);
  }
};

/**
 * GET /api/problems
 * Fetch coding problems summary for listings (Cached via Redis)
 */
export const getAllProblems = async (req, res) => {
  try {
    const isFull = req.query.full === "true";
    const cacheKey = isFull ? "problems:all:full" : "problems:all:summary";

    // 1. Try fetching from Redis cache first
    if (redisClient) {
      try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          return res.json(JSON.parse(cachedData));
        }
      } catch (err) {
        console.warn("[Redis Cache] Read error, falling back to MongoDB:", err.message);
      }
    }

    // 2. Query MongoDB with lightweight field selection for listings
    const query = Problem.find();
    if (!isFull) {
      query.select("problemId title difficulty category description.text");
    } else {
      query.select("-__v");
    }

    const problems = await query.lean();

    // 3. Populate Redis Cache asynchronously
    if (redisClient && problems.length > 0) {
      redisClient
        .set(cacheKey, JSON.stringify(problems), "EX", CACHE_TTL)
        .catch((err) => console.warn("[Redis Cache] Write error:", err.message));
    }

    return res.json(problems);
  } catch (error) {
    console.error("Error in getAllProblems:", error.message);
    return res.status(500).json({ message: "Failed to fetch problems." });
  }
};

/**
 * GET /api/problems/:id
 * Fetch a single problem by problemId (slug) or MongoDB _id (Cached via Redis)
 */
export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `problem:${id}`;

    // 1. Check Redis cache
    if (redisClient) {
      try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
          return res.json(JSON.parse(cachedData));
        }
      } catch (err) {
        console.warn("[Redis Cache] Read error, falling back to MongoDB:", err.message);
      }
    }

    // 2. Query MongoDB
    const isObjectId = mongoose.isValidObjectId(id);
    const problem = await Problem.findOne({
      $or: [{ problemId: id }, ...(isObjectId ? [{ _id: id }] : [])],
    })
      .select("-__v")
      .lean();

    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    // 3. Cache the single problem in Redis
    if (redisClient) {
      redisClient
        .set(cacheKey, JSON.stringify(problem), "EX", CACHE_TTL)
        .catch((err) => console.warn("[Redis Cache] Write error:", err.message));
    }

    return res.json(problem);
  } catch (error) {
    console.error("Error in getProblemById:", error.message);
    return res.status(500).json({ message: "Failed to fetch problem." });
  }
};

/**
 * POST /api/problems
 * Create a new problem (Admin Only)
 */
export const createProblem = async (req, res, next) => {
  try {
    const problemData = req.body;
    if (!problemData.problemId || !problemData.title || !problemData.difficulty) {
      return res.status(400).json({ message: "Missing required problem fields." });
    }

    const existing = await Problem.findOne({ problemId: problemData.problemId });
    if (existing) {
      return res.status(400).json({ message: `Problem with ID '${problemData.problemId}' already exists.` });
    }

    const newProblem = await Problem.create(problemData);

    await invalidateProblemCache(newProblem.problemId);

    return res.status(201).json(newProblem);
  } catch (error) {
    console.error("Error in createProblem:", error.message);
    next(error);
  }
};

/**
 * PUT /api/problems/:id
 * Update an existing problem (Admin Only)
 */
export const updateProblem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.isValidObjectId(id);

    const updatedProblem = await Problem.findOneAndUpdate(
      { $or: [{ problemId: id }, ...(isObjectId ? [{ _id: id }] : [])] },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    await invalidateProblemCache(id);
    if (updatedProblem.problemId !== id) {
      await invalidateProblemCache(updatedProblem.problemId);
    }

    return res.json(updatedProblem);
  } catch (error) {
    console.error("Error in updateProblem:", error.message);
    next(error);
  }
};

/**
 * DELETE /api/problems/:id
 * Delete a problem (Admin Only)
 */
export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const isObjectId = mongoose.isValidObjectId(id);

    const deleted = await Problem.findOneAndDelete({
      $or: [{ problemId: id }, ...(isObjectId ? [{ _id: id }] : [])],
    });

    if (!deleted) {
      return res.status(404).json({ message: "Problem not found." });
    }

    await invalidateProblemCache(id);
    await invalidateProblemCache(deleted.problemId);

    return res.json({ message: "Problem deleted successfully." });
  } catch (error) {
    console.error("Error in deleteProblem:", error.message);
    return res.status(500).json({ message: "Failed to delete problem." });
  }
};
