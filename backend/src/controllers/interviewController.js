import mongoose from "mongoose";
import { generateWithFallback } from "../lib/gemini.js";
import Interview from "../models/Interview.js";
import Topic from "../models/Topic.js";
import { dispatchInterviewReportJob } from "../queues/emailQueue.js";
import { ENV } from "../lib/env.js";

const DEFAULT_TOPICS = [
  "Data Structures & Algorithms",
  "Object Oriented Programming",
  "Database Management Systems",
  "Operating Systems",
  "Computer Networks",
  "System Design",
  "Machine Learning",
  "HR Interview",
];

const INTERVIEW_SYSTEM_PROMPT = `You are an expert technical interviewer at a top-tier tech company.
Your goal is to conduct a professional mock interview with a candidate.
Follow these rules strictly:
1. Be professional, encouraging, and clear.
2. Ask one question at a time. Do NOT dump multiple questions at once.
3. Wait for the candidate's answer before proceeding.
4. Ask follow-up questions based on their answers to test their depth of knowledge.
5. NEVER reveal the exact answer immediately if they struggle. Instead, offer gentle hints.
6. Adapt the difficulty based on their responses. If they answer perfectly, ask an optimization or deeper conceptual question.
7. Ask implementation questions or optimization questions when relevant.
8. Maintain the context of the interview throughout the session.`;

export const createInterview = async (req, res) => {
  try {
    const { category, difficulty, duration, mode = "Text" } = req.body;
    
    if (!category || !difficulty || !duration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newInterview = new Interview({
      userId: req.user._id,
      category,
      difficulty,
      duration,
      mode,
      conversation: [],
    });

    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (error) {
    console.error("Error in createInterview:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const continueInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid interview ID format" });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (interview.status === "Completed") {
      return res.status(400).json({ message: "Interview is already completed" });
    }

    let userMessage = message;
    if (!userMessage && interview.conversation.length === 0) {
      userMessage = "Hello, I am ready to start my interview.";
    }

    if (userMessage) {
      interview.conversation.push({ role: "user", content: userMessage });
    }

    // Build chat history for Gemini as a transcript string
    const transcript = interview.conversation.map(msg => `${msg.role === 'user' ? 'CANDIDATE' : 'INTERVIEWER'}: ${msg.content}`).join("\n\n");

    const systemInstruction = `${INTERVIEW_SYSTEM_PROMPT}\n\nThe interview category is ${interview.category}. The target difficulty is ${interview.difficulty}. Start or continue the interview accordingly. Keep responses concise.`;
    
    const prompt = `${systemInstruction}\n\n--- INTERVIEW TRANSCRIPT ---\n${transcript}\n\nINTERVIEWER:`;

    const aiResponseText = await generateWithFallback(prompt);
    
    interview.conversation.push({ role: "model", content: aiResponseText });
    await interview.save();
    
    res.status(200).json({ response: aiResponseText, conversation: interview.conversation });
    
  } catch (error) {
    console.error("Error in continueInterview:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const endInterview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid interview ID format" });
    }

    const interview = await Interview.findById(id);

    if (!interview) return res.status(404).json({ message: "Interview not found" });
    if (interview.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });
    
    if (interview.status === "Completed") {
      return res.status(200).json({ score: interview.score, feedback: interview.feedback });
    }

    const transcript = interview.conversation.map(msg => `${msg.role.toUpperCase()}: ${msg.content}`).join("\n\n");

    const feedbackPrompt = `You are an expert technical interviewer. The following is a transcript of a mock interview for the category: ${interview.category} at ${interview.difficulty} difficulty.
    
Transcript:
${transcript}

Evaluate the candidate and provide a comprehensive final report.
Return EXACTLY ONE valid JSON object with the following structure, and nothing else (no markdown blocks, no extra text):
{
  "score": {
    "overall": 0-100,
    "technical": 0-100,
    "problemSolving": 0-100,
    "communication": 0-100,
    "confidence": 0-100
  },
  "feedback": {
    "strengths": ["...", "..."],
    "weaknesses": ["...", "..."],
    "topicsToImprove": ["...", "..."],
    "learningResources": ["...", "..."],
    "suggestedNext": "...",
    "general": "..."
  }
}`;

    let reviewText = await generateWithFallback(feedbackPrompt);
    
    // Cleanup possible markdown formatting from Gemini
    if (reviewText.startsWith("\`\`\`json")) {
        reviewText = reviewText.replace(/^\`\`\`json\n/, "").replace(/\n\`\`\`$/, "");
    }
    
    let parsedFeedback;
    try {
      parsedFeedback = JSON.parse(reviewText);
    } catch (e) {
      console.error("Failed to parse Gemini feedback JSON:", e, reviewText);
      return res.status(500).json({ message: "Failed to generate report card" });
    }

    interview.status = "Completed";
    interview.score = parsedFeedback.score;
    interview.feedback = parsedFeedback.feedback;
    await interview.save();

    // Dispatch background email job to user
    if (req.user && req.user.email) {
      dispatchInterviewReportJob({
        email: req.user.email,
        userName: req.user.fullName || req.user.name || req.user.email.split("@")[0],
        category: interview.category,
        difficulty: interview.difficulty,
        duration: interview.duration,
        score: interview.score,
        feedback: interview.feedback,
        interviewId: interview._id,
      }).catch((err) => console.error("Failed to enqueue interview report email:", err));
    }

    res.status(200).json({ score: interview.score, feedback: interview.feedback });

  } catch (error) {
    console.error("Error in endInterview:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("-conversation"); // Exclude conversation for lighter payload
      
    res.status(200).json(interviews);
  } catch (error) {
    console.error("Error in getInterviewHistory:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid interview ID format" });
    }

    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });
    if (interview.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

    res.status(200).json(interview);
  } catch (error) {
    console.error("Error in getInterviewById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid interview ID format" });
    }

    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });
    if (interview.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

    await Interview.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Interview deleted successfully" });
  } catch (error) {
    console.error("Error in deleteInterview:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= TOPIC MANAGEMENT CONTROLLERS =================

export const getInterviewTopics = async (req, res) => {
  try {
    let topics = await Topic.find({}).sort({ createdAt: 1 });

    // Seed default topics if collection is empty
    if (topics.length === 0) {
      console.log("Seeding default interview topics...");
      const defaultDocs = DEFAULT_TOPICS.map((name) => ({
        name,
        description: `Mock interview sessions for ${name}`,
        isDefault: true,
      }));
      topics = await Topic.insertMany(defaultDocs);
    }

    res.status(200).json(topics);
  } catch (error) {
    console.error("Error in getInterviewTopics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addInterviewTopic = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Topic name is required" });
    }

    const trimmedName = name.trim();
    const existing = await Topic.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, "i") } });
    if (existing) {
      return res.status(400).json({ message: "Topic with this name already exists" });
    }

    const newTopic = new Topic({
      name: trimmedName,
      description: description?.trim() || "",
      isDefault: false,
      createdBy: req.user._id,
    });

    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    console.error("Error in addInterviewTopic:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteInterviewTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    await Topic.findByIdAndDelete(id);
    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error("Error in deleteInterviewTopic:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

