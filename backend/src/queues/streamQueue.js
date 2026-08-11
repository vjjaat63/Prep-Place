import { Queue, Worker } from "bullmq";
import { getBullMQConnection } from "../lib/redis.js";
import { upsertStreamUser } from "../lib/stream.js";

let streamQueue = null;
let streamWorker = null;

const connection = getBullMQConnection();

if (connection) {
  try {
    streamQueue = new Queue("streamQueue", { connection });

    streamWorker = new Worker(
      "streamQueue",
      async (job) => {
        if (job.name === "upsert-stream-user") {
          const { userData } = job.data;
          console.log(`[BullMQ Worker] Processing 'upsert-stream-user' job for user ${userData?.id}`);
          await upsertStreamUser(userData);
          return { success: true };
        }

        throw new Error(`Unknown job name '${job.name}' in streamQueue`);
      },
      { connection }
    );

    streamWorker.on("completed", (job) => {
      console.log(`[BullMQ Worker] Stream job ${job.id} (${job.name}) completed successfully!`);
    });

    streamWorker.on("failed", (job, err) => {
      console.error(`[BullMQ Worker] Stream job ${job?.id} (${job?.name}) failed:`, err.message);
    });

    console.log("⚡ BullMQ Stream Queue & Worker initialized successfully");
  } catch (error) {
    console.error("⚠️ Failed to initialize BullMQ Stream Queue:", error.message);
    streamQueue = null;
    streamWorker = null;
  }
}

/**
 * Dispatch Stream user upsert job to BullMQ queue with graceful direct fallback if Redis is unavailable.
 */
export const dispatchStreamUserUpsert = async (userData) => {
  if (streamQueue) {
    try {
      await streamQueue.add(
        "upsert-stream-user",
        { userData },
        {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 2000,
          },
          removeOnComplete: true,
        }
      );
      console.log(`[BullMQ Queue] Enqueued 'upsert-stream-user' job for user ${userData?.id}`);
      return true;
    } catch (err) {
      console.warn("⚠️ Enqueue failed, falling back to direct upsertStreamUser:", err.message);
    }
  }

  // Fallback if queue/redis is unavailable
  console.log(`[Fallback] Upserting Stream user directly for user ${userData?.id}`);
  await upsertStreamUser(userData);
  return true;
};

export { streamQueue, streamWorker };
