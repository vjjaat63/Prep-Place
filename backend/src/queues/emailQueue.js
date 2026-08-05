import { Queue, Worker } from "bullmq";
import { getBullMQConnection } from "../lib/redis.js";
import { sendOTP } from "../lib/email.js";

let emailQueue = null;
let emailWorker = null;

const connection = getBullMQConnection();

if (connection) {
  try {
    emailQueue = new Queue("emailQueue", { connection });
    
    emailWorker = new Worker(
      "emailQueue",
      async (job) => {
        const { email, otp } = job.data;
        console.log(`[BullMQ Worker] Processing send-otp job for ${email}`);
        const success = await sendOTP(email, otp);
        if (!success) {
          throw new Error(`Failed to send OTP email to ${email}`);
        }
        return { success: true };
      },
      { connection: getBullMQConnection() }
    );

    emailWorker.on("completed", (job) => {
      console.log(`[BullMQ Worker] Job ${job.id} (send-otp) completed successfully`);
    });

    emailWorker.on("failed", (job, err) => {
      console.error(`[BullMQ Worker] Job ${job?.id} failed:`, err.message);
    });

    console.log("⚡ BullMQ Email Queue & Worker initialized successfully");
  } catch (error) {
    console.error("⚠️ Failed to initialize BullMQ Email Queue:", error.message);
    emailQueue = null;
    emailWorker = null;
  }
}

/**
 * Dispatch OTP email sending job to queue with graceful direct fallback if Redis is unavailable.
 */
export const dispatchEmailJob = async (email, otp) => {
  if (emailQueue) {
    try {
      await emailQueue.add(
        "send-otp",
        { email, otp },
        {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 2000,
          },
          removeOnComplete: true,
        }
      );
      console.log(`[BullMQ Queue] Enqueued send-otp job for ${email}`);
      return true;
    } catch (err) {
      console.warn("⚠️ Enqueue failed, falling back to direct sendOTP:", err.message);
    }
  }

  // Fallback if queue/redis is unavailable
  console.log(`[Fallback] Sending OTP directly to ${email}`);
  return await sendOTP(email, otp);
};

export { emailQueue, emailWorker };
