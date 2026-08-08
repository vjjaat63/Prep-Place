import { Queue, Worker } from "bullmq";
import { getBullMQConnection } from "../lib/redis.js";

let resumeQueue = null;
let resumeWorker = null;

const connection = getBullMQConnection();

if (connection) {
  try {
    resumeQueue = new Queue("resumeQueue", { connection });

    resumeWorker = new Worker(
      "resumeQueue",
      async (job) => {
        const { userId, fileName } = job.data;
        console.log(`[BullMQ Worker] Processing resume job for user ${userId}, file: ${fileName}`);
        // Worker processing placeholder / handler for heavy processing jobs
        return { success: true, processedAt: new Date().toISOString() };
      },
      { connection }
    );

    resumeWorker.on("completed", (job) => {
      console.log(`[BullMQ Worker] Resume job ${job.id} completed successfully`);
    });

    resumeWorker.on("failed", (job, err) => {
      console.error(`[BullMQ Worker] Resume job ${job?.id} failed:`, err.message);
    });

    console.log("⚡ BullMQ Resume Queue & Worker initialized successfully");
  } catch (error) {
    console.error("⚠️ Failed to initialize BullMQ Resume Queue:", error.message);
    resumeQueue = null;
    resumeWorker = null;
  }
}

export const dispatchResumeJob = async (jobData) => {
  if (resumeQueue) {
    try {
      const job = await resumeQueue.add("process-resume", jobData, {
        attempts: 3,
        backoff: { type: "exponential", delay: 3000 },
        removeOnComplete: true,
      });
      return job.id;
    } catch (err) {
      console.warn("⚠️ Resume queue error:", err.message);
    }
  }
  return null;
};

export { resumeQueue, resumeWorker };
