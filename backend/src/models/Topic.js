import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: [100, "Topic name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    icon: {
      type: String,
      default: "Brain",
      trim: true,
      maxlength: [50, "Icon name cannot exceed 50 characters"],
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    domain: {
      type: String,
      enum: ["Core Subjects", "Programming Languages", "Applied Tech", "HR & Soft Skills"],
      default: "Core Subjects",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
