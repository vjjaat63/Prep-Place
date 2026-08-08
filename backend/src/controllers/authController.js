import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import { upsertStreamUser } from "../lib/stream.js";
import { ENV } from "../lib/env.js";
import { sendOTP } from "../lib/email.js";
import { dispatchEmailJob } from "../queues/emailQueue.js";
import cloudinary from "../lib/cloudinary.js";
import { saveOTP, verifyOTP } from "../lib/otpStore.js";

// Utility function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "15d",
  });
};

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (req, res) => {
  try {
    const { name, email, password, profileImage: customProfileImage } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = generateOTP();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save OTP to Redis with 10-minute TTL (EX 600)
    await saveOTP("verify", email, otp);

    if (existingUser && !existingUser.isVerified) {
      // User exists but is unverified, overwrite their credentials and resend OTP
      existingUser.name = name;
      existingUser.password = hashedPassword;
      await existingUser.save();

      await dispatchEmailJob(email, otp);
      return res.status(200).json({ message: "OTP sent to email", email: existingUser.email });
    }

    // New user
    const generatedClerkId = uuidv4();
    let profileImage = `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;

    if (customProfileImage) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(customProfileImage, {
          folder: "Prep Place/avatars",
        });
        profileImage = uploadResponse.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error in register:", error);
      }
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      clerkId: generatedClerkId,
      profileImage,
      isVerified: false,
    });

    await newUser.save();
    await dispatchEmailJob(email, otp);

    res.status(201).json({ message: "OTP sent to email", email: newUser.email });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    // Verify OTP from Redis (TTL auto-expires after 10 mins)
    const result = await verifyOTP("verify", email, otp);
    if (!result.valid) {
      return res.status(400).json({ message: result.message });
    }

    user.isVerified = true;
    await user.save();

    // Upsert user in Stream only after successful verification
    await upsertStreamUser({
      id: user.clerkId.toString(),
      name: user.name,
      image: user.profileImage,
    });

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      clerkId: user.clerkId,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Error in verifyEmail controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    const otp = generateOTP();

    // Save fresh OTP to Redis with 10-minute TTL
    await saveOTP("verify", email, otp);
    await dispatchEmailJob(email, otp);

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Error in resendOtp controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "This account was created with Clerk. Please reset your password or create a new account." });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in", email: user.email, requiresVerification: true });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      clerkId: user.clerkId,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in getMe controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, profileImage } = req.body;
    const user = req.user;

    if (name) user.name = name;

    if (profileImage) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(profileImage, {
          folder: "Prep Place/avatars",
        });
        user.profileImage = uploadResponse.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error in updateProfile:", error);
        return res.status(500).json({ message: "Failed to upload profile picture" });
      }
    }

    await user.save();

    // Update Stream user
    await upsertStreamUser({
      id: user.clerkId.toString(),
      name: user.name,
      image: user.profileImage,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      clerkId: user.clerkId,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in updateProfile controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const requestAccountDeletion = async (req, res) => {
  try {
    const { password } = req.body;
    const user = req.user;

    // Verify password if user has one
    if (user.password) {
      if (!password) {
        return res.status(400).json({ message: "Password is required to delete account" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" });
      }
    }

    const otp = generateOTP();

    // Save deletion OTP to Redis with 10-minute TTL
    await saveOTP("delete", user._id.toString(), otp);
    await sendOTP(user.email, otp);

    res.status(200).json({ message: "OTP sent to verify account deletion" });
  } catch (error) {
    console.error("Error in requestAccountDeletion:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const confirmAccountDeletion = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = req.user;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    // Verify deletion OTP from Redis (TTL auto-expires after 10 mins)
    const result = await verifyOTP("delete", user._id.toString(), otp);
    if (!result.valid) {
      return res.status(400).json({ message: result.message });
    }

    // OTP valid, delete account
    await User.findByIdAndDelete(user._id);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error in confirmAccountDeletion:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
