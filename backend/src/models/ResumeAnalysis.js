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
    },
    originalName: {
      type: String,
      required: true,
    },
    resumeUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
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
