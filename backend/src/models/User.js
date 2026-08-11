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
        // Password required only for local email/password users without clerkId or OAuth IDs
        return !this.clerkId && !this.googleId && !this.githubId;
      },
    },
    profileImage: {
      type: String,
      default: "",
    },
    clerkId: {
      type: String,
      // Allowed for compatibility with Stream and existing Clerk users
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    githubId: {
      type: String,
      sparse: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: ["local", "google", "github", "clerk"],
      default: "local",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;
