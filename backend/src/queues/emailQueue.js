import { Queue, Worker } from "bullmq";
import { getBullMQConnection } from "../lib/redis.js";
import { sendOTP, sendResumeReportEmail } from "../lib/email.js";

let emailQueue = null;
let emailWorker = null;

const connection = getBullMQConnection();

if (connection) {
  try {
    emailQueue = new Queue("emailQueue", { connection });

    emailWorker = new Worker(
      "emailQueue",
      async (job) => {
        if (job.name === "send-otp") {
          const { email, otp } = job.data;
          console.log(`[BullMQ Worker] Processing 'send-otp' job for ${email}`);
          const success = await sendOTP(email, otp);
          if (!success) throw new Error(`Failed to send OTP email to ${email}`);
          return { success: true };
        }

        if (job.name === "send-resume-report") {
          const { email, userName, targetRole, atsScore, analysis, reportId } = job.data;
          console.log(`[BullMQ Worker] Processing 'send-resume-report' job for ${email} (${targetRole})`);
          const success = await sendResumeReportEmail({
            email,
            userName,
            targetRole,
            atsScore,
            analysis,
            reportId,
          });
          if (!success) throw new Error(`Failed to send ATS report email to ${email}`);
          return { success: true };
        }

        throw new Error(`Unknown job name '${job.name}' in emailQueue`);
      },
      { connection }
    );

    emailWorker.on("completed", (job) => {
      console.log(`[BullMQ Worker] Job ${job.id} (${job.name}) completed successfully!`);
    });

    emailWorker.on("failed", (job, err) => {
      console.error(`[BullMQ Worker] Job ${job?.id} (${job?.name}) failed:`, err.message);
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
      console.log(`[BullMQ Queue] Enqueued 'send-otp' job for ${email}`);
      return true;
    } catch (err) {
      console.warn("⚠️ Enqueue failed, falling back to direct sendOTP:", err.message);
    }
  }

  // Fallback if queue/redis is unavailable
  console.log(`[Fallback] Sending OTP directly to ${email}`);
  return await sendOTP(email, otp);
};

/**
 * Dispatch Resume ATS Report email job to BullMQ with graceful direct fallback.
 */
export const dispatchResumeReportJob = async ({ email, userName, targetRole, atsScore, analysis, reportId }) => {
  if (emailQueue) {
    try {
      await emailQueue.add(
        "send-resume-report",
        { email, userName, targetRole, atsScore, analysis, reportId },
        {
          attempts: 3,
          backoff: {
            type: "exponential",
            delay: 3000,
          },
          removeOnComplete: true,
        }
      );
      console.log(`[BullMQ Queue] Enqueued 'send-resume-report' job for ${email} (Score: ${atsScore})`);
      return true;
    } catch (err) {
      console.warn("⚠️ Enqueue failed, falling back to direct sendResumeReportEmail:", err.message);
    }
  }

  // Fallback if queue/redis is unavailable
  console.log(`[Fallback] Sending Resume Report email directly to ${email}`);
  return await sendResumeReportEmail({ email, userName, targetRole, atsScore, analysis, reportId });
};

export { emailQueue, emailWorker };
