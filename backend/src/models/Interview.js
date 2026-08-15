import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "model", "system"],
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: [10000, "Content cannot exceed 10,000 characters"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const mcqQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String }],
  correctOption: { type: String, required: true },
  explanation: { type: String, default: "" },
  userAnswer: { type: String, default: "" },
  isCorrect: { type: Boolean, default: null },
});

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, "Category cannot exceed 500 characters"],
    },
    categories: [{ type: String }],
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing",
    },
    mode: {
      type: String,
      enum: ["Text", "Audio"],
      default: "Text",
    },
    questionFormat: {
      type: String,
      enum: ["Conversational", "MCQ"],
      default: "Conversational",
    },
    mcqQuestions: [mcqQuestionSchema],
    conversation: [messageSchema],
    score: {
      overall: Number,
      technical: Number,
      problemSolving: Number,
      communication: Number,
      confidence: Number,
    },
    feedback: {
      strengths: [String],
      weaknesses: [String],
      topicsToImprove: [String],
      learningResources: [String],
      suggestedNext: String,
      general: String,
    },
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
