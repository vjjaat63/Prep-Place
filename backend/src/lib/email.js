import nodemailer from "nodemailer";
import { ENV } from "./env.js";

export const sendOTP = async (email, otp) => {
  try {
    // You can configure your actual SMTP credentials in .env later
    // Using a generic transporter for now
    const transporter = nodemailer.createTransport({
      host: ENV.SMTP_HOST,
      port: ENV.SMTP_PORT,
      auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: '"Prep Place" <noreply@prepplace.com>',
      to: email,
      subject: "Your OTP Code for Prep Place",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2>Verify Your Email Address</h2>
          <p>Thank you for signing up for  Prep Place! Please use the following One-Time Password (OTP) to complete your registration:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4F46E5; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
