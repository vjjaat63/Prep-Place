import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetRole: {
      type: String,
      required: true,
      default: "Software Engineer",
      trim: true,
      maxlength: [100, "Target role cannot exceed 100 characters"],
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
      maxlength: [255, "Original file name cannot exceed 255 characters"],
    },
    resumeUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Resume URL cannot exceed 1000 characters"],
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
      maxlength: [255, "Public ID cannot exceed 255 characters"],
    },
    fileSize: {
      type: Number,
      required: true,
    },
    atsScore: {
      type: Number,
      required: true,
    },
    analysis: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const ResumeAnalysis = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);

export default ResumeAnalysis;
