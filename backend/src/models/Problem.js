import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
  {
    input: { type: String, required: true },
    output: { type: String, required: true },
    explanation: { type: String },
  },
  { _id: false }
);

const problemSchema = new mongoose.Schema(
  {
    problemId: {
      type: String,
      required: true,
      unique: true,
      index: true, // e.g. "two-sum", "reverse-string"
      trim: true,
      maxlength: [100, "problemId cannot exceed 100 characters"],
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Category cannot exceed 100 characters"],
    },
    description: {
      text: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: [20000, "Description cannot exceed 20,000 characters"] 
      },
      notes: [{ type: String }],
    },
    examples: [exampleSchema],
    constraints: [{ type: String }],
    starterCode: {
      javascript: { type: String, default: "" },
      python: { type: String, default: "" },
      java: { type: String, default: "" },
      cpp: { type: String, default: "" },
    },
    expectedOutput: {
      javascript: { type: String, default: "" },
      python: { type: String, default: "" },
      java: { type: String, default: "" },
      cpp: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
