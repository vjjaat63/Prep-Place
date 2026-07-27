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
