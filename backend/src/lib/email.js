import nodemailer from "nodemailer";
import { ENV } from "./env.js";

export const sendOTP = async (email, otp) => {
  try {
    const apiKey = ENV.BREVO_API_KEY;
    const senderEmail = ENV.BREVO_SENDER_EMAIL;

    if (!apiKey || !senderEmail) {
      console.error("Missing BREVO_API_KEY or BREVO_SENDER_EMAIL in environment variables.");
      return false;
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
        <h2>Verify Your Email Address</h2>
        <p>Thank you for signing up for Prep Place! Please use the following One-Time Password (OTP) to complete your registration:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4F46E5; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Prep Place", email: senderEmail },
        to: [{ email: email }],
        subject: "Your OTP Code for Prep Place",
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo API Error:", errorData);
      return false;
    }

    console.log(`OTP sent to ${email}: ${otp}`);
    return true;
  } catch (error) {
    console.error("Error sending email via Brevo:", error);
    return false;
  }
};

export const sendResumeReportEmail = async ({ email, userName, targetRole, atsScore, analysis, reportId }) => {
  try {
    const apiKey = ENV.BREVO_API_KEY;
    const senderEmail = ENV.BREVO_SENDER_EMAIL;
    const clientUrl = ENV.CLIENT_URL || "http://localhost:5173";

    if (!apiKey || !senderEmail) {
      console.error("Missing BREVO_API_KEY or BREVO_SENDER_EMAIL in environment variables.");
      return false;
    }

    const scoreColor = atsScore >= 80 ? "#10B981" : atsScore >= 60 ? "#F59E0B" : "#EF4444";
    const reportUrl = `${clientUrl}/resume/${reportId}`;

    const strengthsList = Array.isArray(analysis?.strengths)
      ? analysis.strengths.slice(0, 4).map((s) => `<li style="margin-bottom: 6px; color: #374151;">${s}</li>`).join("")
      : "<li>Well structured resume</li>";

    const missingSkillsList = Array.isArray(analysis?.missingSkills)
      ? analysis.missingSkills.slice(0, 5).map((s) => `<li style="margin-bottom: 6px; color: #EF4444;">${s}</li>`).join("")
      : "<li>No critical missing skills found</li>";

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
        <!-- HEADER -->
        <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 32px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Prep Place</h1>
          <p style="margin: 6px 0 0 0; color: #e0e7ff; font-size: 14px;">ATS Resume Analysis Report</p>
        </div>

        <!-- BODY -->
        <div style="padding: 28px 24px; background-color: #0f172a;">
          <h2 style="font-size: 20px; margin: 0 0 12px 0; color: #f8fafc;">Hello, ${userName || "Candidate"} 👋</h2>
          <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
            Your resume has been analyzed for the position of <strong style="color: #6366f1;">${targetRole}</strong>. Here is your evaluation summary:
          </p>

          <!-- SCORE BADGE CARD -->
          <div style="background-color: #1e293b; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #334155; margin-bottom: 24px;">
            <div style="font-size: 12px; text-transform: uppercase; tracking: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 6px;">ATS Compatibility Score</div>
            <div style="font-size: 42px; font-weight: 900; color: ${scoreColor}; font-family: monospace;">${atsScore}<span style="font-size: 20px; color: #64748b;">/100</span></div>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #cbd5e1;">${analysis?.overallVerdict || "Evaluation complete."}</p>
          </div>

          <!-- SUMMARY -->
          ${
            analysis?.summary
              ? `<div style="background-color: #1e293b; border-left: 4px solid #6366f1; padding: 14px 16px; border-radius: 6px; margin-bottom: 24px; font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                  ${analysis.summary}
                </div>`
              : ""
          }

          <!-- STRENGTHS -->
          <div style="background-color: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 20px; border: 1px solid #334155;">
            <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #34d399; font-weight: 700;">✅ Top Key Strengths</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #cbd5e1;">
              ${strengthsList}
            </ul>
          </div>

          <!-- MISSING SKILLS -->
          <div style="background-color: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 28px; border: 1px solid #334155;">
            <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #f87171; font-weight: 700;">⚠️ Recommended / Missing Skills for ${targetRole}</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #cbd5e1;">
              ${missingSkillsList}
            </ul>
          </div>

          <!-- CTA BUTTON -->
          <div style="text-align: center; margin: 32px 0 16px 0;">
            <a href="${reportUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 10px; shadow: 0 4px 14px rgba(99,102,241,0.4);">
              View Full Interactive Report ➔
            </a>
          </div>
        </div>

        <!-- FOOTER -->
        <div style="background-color: #020617; padding: 18px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b;">
          <p style="margin: 0;">Prep Place — Code & Prepare Together</p>
          <p style="margin: 4px 0 0 0;">This email was sent automatically by BullMQ Background Workers.</p>
        </div>
      </div>
    `;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Prep Place ATS", email: senderEmail },
        to: [{ email: email, name: userName }],
        subject: `Your ATS Resume Report (${atsScore}/100) - ${targetRole}`,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo Resume Report Email API Error:", errorData);
      return false;
    }

    console.log(`[BullMQ / Brevo] Resume ATS Report email successfully sent to ${email} (Score: ${atsScore})`);
    return true;
  } catch (error) {
    console.error("Error sending Resume Report email via Brevo:", error);
    return false;
  }
};

export const sendInterviewReportEmail = async ({ email, userName, category, difficulty, duration, score, feedback, interviewId }) => {
  try {
    const apiKey = ENV.BREVO_API_KEY;
    const senderEmail = ENV.BREVO_SENDER_EMAIL;
    const clientUrl = ENV.CLIENT_URL || "http://localhost:5173";

    if (!apiKey || !senderEmail) {
      console.error("Missing BREVO_API_KEY or BREVO_SENDER_EMAIL in environment variables.");
      return false;
    }

    const overallScore = score?.overall ?? 0;
    const scoreColor = overallScore >= 80 ? "#10B981" : overallScore >= 60 ? "#F59E0B" : "#EF4444";
    const reportUrl = `${clientUrl}/interviews/summary/${interviewId}`;

    const strengthsList = Array.isArray(feedback?.strengths) && feedback.strengths.length > 0
      ? feedback.strengths.map((s) => `<li style="margin-bottom: 6px; color: #374151;">${s}</li>`).join("")
      : "<li>Solid effort during the mock session.</li>";

    const topicsToImproveList = Array.isArray(feedback?.topicsToImprove) && feedback.topicsToImprove.length > 0
      ? feedback.topicsToImprove.map((t) => `<li style="margin-bottom: 6px; color: #EF4444;">${t}</li>`).join("")
      : "<li>No major critical weaknesses identified.</li>";

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
        <!-- HEADER -->
        <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); padding: 32px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Prep Place</h1>
          <p style="margin: 6px 0 0 0; color: #e0e7ff; font-size: 14px;">AI Mock Interview Assessment Report</p>
        </div>

        <!-- BODY -->
        <div style="padding: 28px 24px; background-color: #0f172a;">
          <h2 style="font-size: 20px; margin: 0 0 12px 0; color: #f8fafc;">Hello, ${userName || "Candidate"} 👋</h2>
          <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">
            You have completed your <strong style="color: #6366f1;">${category}</strong> mock interview (${difficulty} level, ${duration} mins). Here is your performance breakdown:
          </p>

          <!-- OVERALL SCORE CARD -->
          <div style="background-color: #1e293b; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #334155; margin-bottom: 24px;">
            <div style="font-size: 12px; text-transform: uppercase; tracking: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 6px;">Overall Assessment Score</div>
            <div style="font-size: 42px; font-weight: 900; color: ${scoreColor}; font-family: monospace;">${overallScore}<span style="font-size: 20px; color: #64748b;">/100</span></div>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #cbd5e1;">${feedback?.suggestedNext || "Great job completing your mock interview session!"}</p>
          </div>

          <!-- DETAILED SCORE MATRIX -->
          <div style="background-color: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 24px; border: 1px solid #334155;">
            <h3 style="margin: 0 0 14px 0; font-size: 15px; color: #f8fafc; font-weight: 700;">📊 Metric Breakdown</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #cbd5e1;">
              <tr>
                <td style="padding: 6px 0;">Technical Knowledge:</td>
                <td style="text-align: right; font-weight: 700; color: #6366f1;">${score?.technical ?? 0}/100</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;">Problem Solving:</td>
                <td style="text-align: right; font-weight: 700; color: #6366f1;">${score?.problemSolving ?? 0}/100</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;">Communication:</td>
                <td style="text-align: right; font-weight: 700; color: #6366f1;">${score?.communication ?? 0}/100</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;">Confidence:</td>
                <td style="text-align: right; font-weight: 700; color: #6366f1;">${score?.confidence ?? 0}/100</td>
              </tr>
            </table>
          </div>

          <!-- STRENGTHS -->
          <div style="background-color: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 20px; border: 1px solid #334155;">
            <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #34d399; font-weight: 700;">✅ Top Key Strengths</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #cbd5e1;">
              ${strengthsList}
            </ul>
          </div>

          <!-- TOPICS TO IMPROVE -->
          <div style="background-color: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 28px; border: 1px solid #334155;">
            <h3 style="margin: 0 0 10px 0; font-size: 15px; color: #f87171; font-weight: 700;">🎯 Key Areas & Topics to Improve</h3>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #cbd5e1;">
              ${topicsToImproveList}
            </ul>
          </div>

          <!-- CTA BUTTON -->
          <div style="text-align: center; margin: 32px 0 16px 0;">
            <a href="${reportUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 10px; box-shadow: 0 4px 14px rgba(99,102,241,0.4);">
              View Complete Interview Report ➔
            </a>
          </div>
        </div>

        <!-- FOOTER -->
        <div style="background-color: #020617; padding: 18px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b;">
          <p style="margin: 0;">Prep Place — AI Mock Interview System</p>
          <p style="margin: 4px 0 0 0;">This evaluation was automatically generated by BullMQ Background Workers.</p>
        </div>
      </div>
    `;

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Prep Place AI", email: senderEmail },
        to: [{ email: email, name: userName }],
        subject: `Mock Interview Assessment: ${category} (${overallScore}/100)`,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo Interview Report Email API Error:", errorData);
      return false;
    }

    console.log(`[BullMQ / Brevo] Mock Interview Assessment email successfully sent to ${email} (Score: ${overallScore})`);
    return true;
  } catch (error) {
    console.error("Error sending Mock Interview Report email via Brevo:", error);
    return false;
  }
};


