import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import { dispatchStreamUserUpsert } from "../queues/streamQueue.js";
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

// Utility function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === "string" && emailRegex.test(email.trim());
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, profileImage: customProfileImage } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

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
    const generatedStreamUserId = uuidv4();
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
      streamUserId: generatedStreamUserId,
      profileImage,
      isVerified: false,
    });

    await newUser.save();
    await dispatchEmailJob(email, otp);

    res.status(201).json({ message: "OTP sent to email", email: newUser.email });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    next(error);
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

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

    // Upsert user in Stream via BullMQ background queue
    await dispatchStreamUserUpsert({
      id: (user.streamUserId || user._id).toString(),
      name: user.name,
      image: user.profileImage,
    });

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      streamUserId: user.streamUserId,
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

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

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

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "This account was created using Google or GitHub sign-in. Please sign in with your social provider." });
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
      streamUserId: user.streamUserId,
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

    // Update Stream user via BullMQ background queue
    await dispatchStreamUserUpsert({
      id: (user.streamUserId || user._id).toString(),
      name: user.name,
      image: user.profileImage,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
      streamUserId: user.streamUserId,
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

// ==========================================
// GOOGLE OAUTH CONTROLLERS
// ==========================================

export const googleAuth = (req, res) => {
  try {
    if (!ENV.GOOGLE_CLIENT_ID) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Google OAuth is not configured on the server")}`);
    }

    const state = crypto.randomBytes(32).toString("hex");
    res.cookie("oauth_state", state, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000, // 10 minutes
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
    });

    const redirectUri = `${req.protocol}://${req.get("host")}/api/auth/google/callback`;
    const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleUrl.searchParams.set("client_id", ENV.GOOGLE_CLIENT_ID);
    googleUrl.searchParams.set("redirect_uri", redirectUri);
    googleUrl.searchParams.set("response_type", "code");
    googleUrl.searchParams.set("scope", "openid email profile");
    googleUrl.searchParams.set("state", state);
    googleUrl.searchParams.set("prompt", "select_account");

    res.redirect(googleUrl.toString());
  } catch (error) {
    console.error("Error initiating Google Auth:", error.message);
    res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Failed to initiate Google authentication")}`);
  }
};

export const googleCallback = async (req, res) => {
  try {
    const { code, state, error: googleError } = req.query;
    const storedState = req.cookies?.oauth_state;

    res.clearCookie("oauth_state");

    if (googleError) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Google login was cancelled or denied")}`);
    }

    if (!code || !state || !storedState || state !== storedState) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Invalid authentication state. Please try again.")}`);
    }

    const redirectUri = `${req.protocol}://${req.get("host")}/api/auth/google/callback`;

    // Exchange code for Google tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: ENV.GOOGLE_CLIENT_ID,
        client_secret: ENV.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("Google Token Error:", tokenData);
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Failed to exchange code with Google")}`);
    }

    // Fetch user profile from Google
    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileResponse.json();

    if (!profile || !profile.email) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Unable to retrieve email from Google profile")}`);
    }

    // Find or create user
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.findOne({ email: profile.email.toLowerCase() });

      if (user) {
        // Account exists with matching email - link Google ID
        user.googleId = profile.id;
        user.isVerified = true;
        if (!user.profileImage) {
          user.profileImage = profile.picture || `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`;
        }
        if (!user.streamUserId) {
          user.streamUserId = uuidv4();
        }
        await user.save();
      } else {
        // Create new user via Google OAuth
        const generatedStreamUserId = uuidv4();
        user = new User({
          name: profile.name || "Google User",
          email: profile.email.toLowerCase(),
          profileImage: profile.picture || `https://api.dicebear.com/9.x/initials/svg?seed=${profile.name}`,
          streamUserId: generatedStreamUserId,
          googleId: profile.id,
          provider: "google",
          isVerified: true,
        });

        await user.save();

        // Queue Stream user creation in background
        await dispatchStreamUserUpsert({
          id: generatedStreamUserId,
          name: user.name,
          image: user.profileImage,
        });
      }
    }

    const token = generateToken(user._id);

    res.redirect(`${ENV.CLIENT_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error("Error in Google Callback:", error.message);
    res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Google authentication failed. Please try again.")}`);
  }
};

// ==========================================
// GITHUB OAUTH CONTROLLERS
// ==========================================

export const githubAuth = (req, res) => {
  try {
    if (!ENV.GITHUB_CLIENT_ID) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("GitHub OAuth is not configured on the server")}`);
    }

    const state = crypto.randomBytes(32).toString("hex");
    res.cookie("oauth_state", state, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
      sameSite: "lax",
      secure: ENV.NODE_ENV === "production",
    });

    const redirectUri = `${req.protocol}://${req.get("host")}/api/auth/github/callback`;
    const githubUrl = new URL("https://github.com/login/oauth/authorize");
    githubUrl.searchParams.set("client_id", ENV.GITHUB_CLIENT_ID);
    githubUrl.searchParams.set("redirect_uri", redirectUri);
    githubUrl.searchParams.set("scope", "user:email");
    githubUrl.searchParams.set("state", state);

    res.redirect(githubUrl.toString());
  } catch (error) {
    console.error("Error initiating GitHub Auth:", error.message);
    res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Failed to initiate GitHub authentication")}`);
  }
};

export const githubCallback = async (req, res) => {
  try {
    const { code, state, error: githubError } = req.query;
    const storedState = req.cookies?.oauth_state;

    res.clearCookie("oauth_state");

    if (githubError) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("GitHub login was cancelled or denied")}`);
    }

    if (!code || !state || !storedState || state !== storedState) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Invalid authentication state. Please try again.")}`);
    }

    const redirectUri = `${req.protocol}://${req.get("host")}/api/auth/github/callback`;

    // Exchange code for GitHub access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: ENV.GITHUB_CLIENT_ID,
        client_secret: ENV.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("GitHub Token Error:", tokenData);
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Failed to exchange code with GitHub")}`);
    }

    // Fetch user profile from GitHub
    const profileResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "PrepPlace-App",
      },
    });

    const profile = await profileResponse.json();

    if (!profile || !profile.id) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("Unable to retrieve GitHub profile")}`);
    }

    // Determine email (fetch from /user/emails if primary email is private)
    let email = profile.email;

    if (!email) {
      const emailsResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "User-Agent": "PrepPlace-App",
        },
      });

      if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        const primaryEmail = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified) || emails[0];
        email = primaryEmail ? primaryEmail.email : null;
      }
    }

    if (!email) {
      return res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("No verified email found on your GitHub account")}`);
    }

    const githubIdStr = profile.id.toString();

    // Find or create user
    let user = await User.findOne({ githubId: githubIdStr });

    if (!user) {
      user = await User.findOne({ email: email.toLowerCase() });

      if (user) {
        // Account exists with matching email - link GitHub ID
        user.githubId = githubIdStr;
        user.isVerified = true;
        if (!user.profileImage) {
          user.profileImage = profile.avatar_url || `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`;
        }
        if (!user.streamUserId) {
          user.streamUserId = uuidv4();
        }
        await user.save();
      } else {
        // Create new user via GitHub OAuth
        const generatedStreamUserId = uuidv4();
        const displayName = profile.name || profile.login || "GitHub User";
        user = new User({
          name: displayName,
          email: email.toLowerCase(),
          profileImage: profile.avatar_url || `https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`,
          streamUserId: generatedStreamUserId,
          githubId: githubIdStr,
          provider: "github",
          isVerified: true,
        });

        await user.save();

        // Queue Stream user creation in background
        await dispatchStreamUserUpsert({
          id: generatedStreamUserId,
          name: user.name,
          image: user.profileImage,
        });
      }
    }

    const token = generateToken(user._id);

    res.redirect(`${ENV.CLIENT_URL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error("Error in GitHub Callback:", error.message);
    res.redirect(`${ENV.CLIENT_URL}/login?error=${encodeURIComponent("GitHub authentication failed. Please try again.")}`);
  }
};
