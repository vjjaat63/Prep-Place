import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import Problem from "../models/Problem.js";
import { redisClient } from "../lib/redis.js";
import { PROBLEMS } from "../data/initialProblems.js";

const seed = async () => {
  try {
    console.log("🌱 Starting problem database seeding...");
    await connectDB();

    const problemList = Object.values(PROBLEMS);
    console.log(`Found ${problemList.length} problems to seed.`);

    let count = 0;
    for (const rawProblem of problemList) {
      const formatted = {
        problemId: rawProblem.id,
        title: rawProblem.title,
        difficulty: rawProblem.difficulty || "Easy",
        category: rawProblem.category || "General",
        description: {
          text: rawProblem.description?.text || "",
          notes: rawProblem.description?.notes || [],
        },
        examples: rawProblem.examples || [],
        constraints: rawProblem.constraints || [],
        starterCode: rawProblem.starterCode || {},
        expectedOutput: rawProblem.expectedOutput || {},
      };

      await Problem.findOneAndUpdate(
        { problemId: formatted.problemId },
        formatted,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      count++;
    }

    console.log(`✅ Successfully seeded/updated ${count} problems in MongoDB.`);

    // Flush problem cache from Redis
    if (redisClient) {
      try {
        await redisClient.del("problems:all");
        console.log("⚡ Cleared 'problems:all' cache key in Redis.");
      } catch (err) {
        console.warn("⚠️ Could not clear Redis cache:", err.message);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding problems:", error);
    process.exit(1);
  }
};

seed();
