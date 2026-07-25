import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        // Only require password if the user doesn't have an existing clerkId
        // This helps transition existing users without breaking them
        return !this.clerkId;
      },
    },
    profileImage: {
      type: String,
      default: "",
    },
    clerkId: {
      type: String,
      // Removed unique: true and required: true to allow new users with generated UUIDs
      // and prevent issues with existing users
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    deleteOtp: {
      type: String,
    },
    deleteOtpExpires: {
      type: Date,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;
