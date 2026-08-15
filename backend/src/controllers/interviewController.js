import mongoose from "mongoose";
import { generateWithFallback } from "../lib/gemini.js";
import Interview from "../models/Interview.js";
import Topic from "../models/Topic.js";
import { saveMCQSession, getMCQSession, appendMCQQuestions, recordMCQAnswer, clearMCQSession } from "../lib/mcqStore.js";
import { dispatchInterviewReportJob } from "../queues/emailQueue.js";
import { ENV } from "../lib/env.js";

const DEFAULT_TOPICS = [
  // Core Subjects
  { name: "Data Structures & Algorithms", domain: "Core Subjects" },
  { name: "Object Oriented Programming", domain: "Core Subjects" },
  { name: "Database Management Systems", domain: "Core Subjects" },
  { name: "Operating Systems", domain: "Core Subjects" },
  { name: "Computer Networks", domain: "Core Subjects" },
  { name: "System Design", domain: "Core Subjects" },
  { name: "Software Engineering & Agile", domain: "Core Subjects" },
  { name: "Cyber Security Fundamentals", domain: "Core Subjects" },
  { name: "Distributed Systems", domain: "Core Subjects" },

  // Programming Languages
  { name: "Java & JVM", domain: "Programming Languages" },
  { name: "Python", domain: "Programming Languages" },
  { name: "C++", domain: "Programming Languages" },
  { name: "JavaScript & TypeScript", domain: "Programming Languages" },
  { name: "C# & .NET", domain: "Programming Languages" },

  // Applied Tech
  { name: "Machine Learning & AI", domain: "Applied Tech" },
  { name: "Generative AI & LLMs", domain: "Applied Tech" },
  { name: "Cloud Computing & DevOps", domain: "Applied Tech" },
  { name: "Full-Stack Web Development", domain: "Applied Tech" },

  // HR & Soft Skills
  { name: "HR Interview", domain: "HR & Soft Skills" },
  { name: "Behavioral & Leadership", domain: "HR & Soft Skills" },
];

const cleanJsonText = (text) => {
  let cleaned = (text || "").trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\n?/, "").replace(/\n?```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\n?/, "").replace(/\n?```$/, "");
  }
  return cleaned.trim();
};

const INTERVIEW_SYSTEM_PROMPT = `You are a Principal Engineer and Lead Technical Interviewer at a top-tier tech company (FAANG / MAANG tier like Google, Amazon, Microsoft, Meta, Apple, Uber, Stripe).
Your goal is to conduct an authentic, real-world technical interview for the selected topic(s).
Follow these rules strictly:
1. Ask authentic, high-quality questions actually asked in real technical interviews at top product companies and tech startups.
2. Focus on practical scenarios, trade-offs, edge cases, time/space complexity, and deep conceptual understanding rather than simple textbook definition lookup.
3. Ask ONE question at a time. Do NOT dump multiple questions at once.
4. Wait for the candidate's response before asking follow-up questions.
5. Provide gentle hints if the candidate struggles, and challenge them with deeper optimization or architectural questions if they answer well.
6. Maintain a professional, encouraging, and realistic interview environment.`;

const MCQ_SYSTEM_PROMPT = `You are a Principal Engineer conducting a real-world technical MCQ assessment for top tech companies.
Follow these rules strictly:
1. Present ONE authentic multiple choice question at a time with 4 distinct options labelled A), B), C), D).
2. Questions must mirror actual company online assessments (OAs) and technical screening rounds.
3. Keep questions practical, testing code behavior, algorithmic complexity, and domain edge cases.
4. Maintain an encouraging and professional tone throughout the session.`;

export const generateMCQBatch = async (category, difficulty, count = 10, excludeQuestions = []) => {
  const excludeText = excludeQuestions.length > 0
    ? `Do NOT duplicate or ask any of these existing questions:\n${excludeQuestions.slice(-10).join("\n")}`
    : "";

  const prompt = `You are a Principal Engineer and Technical Hiring Manager at a top tech company (e.g. Google, Amazon, Microsoft, Meta, Apple, Uber, Stripe).
Create EXACTLY ${count} Multiple Choice Questions (MCQs) for candidate interview assessment in "${category}" at "${difficulty}" difficulty.

CRITICAL REQUIREMENTS:
- Every question MUST be authentic and representative of real technical screening assessments, online assessments (OAs), and technical rounds at top-tier software companies.
- Avoid trivial textbook definitions. Ask real-world code output prediction, time/space complexity trade-offs, concurrency/memory pitfalls, system design decisions, or language-specific edge cases.
- CRITICAL CODE FORMATTING RULE: For programming languages and code snippet questions, ALWAYS format code blocks using proper line breaks (\n) for each line of code. NEVER condense multi-line code snippets or functions into a single line!
- Options must be realistic, tricky, and test true technical depth.
${excludeText}

Return a valid JSON array of ${count} objects, with NO markdown codeblocks, NO extra text, formatted strictly as:
[
  {
    "id": "mcq_${Date.now()}_1",
    "question": "Realistic company interview question text or formatted code snippet here?",
    "options": [
      "A) Option A text",
      "B) Option B text",
      "C) Option C text",
      "D) Option D text"
    ],
    "correctOption": "A",
    "explanation": "Sharp 1-2 sentence technical explanation."
  }
]`;

  let responseText = await generateWithFallback(prompt);
  let cleanedText = cleanJsonText(responseText);

  let questions = [];
  try {
    questions = JSON.parse(cleanedText);
  } catch (e) {
    console.error("Failed to parse Gemini MCQ JSON:", e, responseText);
    questions = [
      {
        id: `mcq_${Date.now()}_1`,
        question: `What is a fundamental concept in ${category}?`,
        options: ["A) Option A", "B) Option B", "C) Option C", "D) Option D"],
        correctOption: "A",
        explanation: `Core principles of ${category} form the basis of this question.`
      }
    ];
  }

  return questions.map((q, idx) => ({
    id: q.id || `mcq_${Date.now()}_${idx + 1}`,
    question: q.question || `Question ${idx + 1}`,
    options: Array.isArray(q.options) && q.options.length === 4 ? q.options : ["A) Option A", "B) Option B", "C) Option C", "D) Option D"],
    correctOption: (q.correctOption || "A").trim().toUpperCase().charAt(0),
    explanation: q.explanation || "Correct option.",
    userAnswer: "",
    isCorrect: null,
  }));
};

export const createInterview = async (req, res) => {
  try {
    const { category, categories, difficulty, duration, mode = "Text", questionFormat = "Conversational" } = req.body;

    let categoriesArr = Array.isArray(categories) && categories.length > 0
      ? categories
      : (category ? category.split(",").map(c => c.trim()) : []);

    let categoryStr = categoriesArr.join(", ");
    if (!categoryStr && typeof category === "string") {
      categoryStr = category;
    }

    if (!categoryStr || !difficulty || !duration) {
      return res.status(400).json({ message: "Interview topic(s), difficulty, and duration are required" });
    }

    let initialMCQs = [];
    if (questionFormat === "MCQ") {
      initialMCQs = await generateMCQBatch(categoryStr, difficulty, 10);
    }

    const newInterview = new Interview({
      userId: req.user._id,
      category: categoryStr,
      categories: categoriesArr,
      difficulty,
      duration,
      mode,
      questionFormat,
      mcqQuestions: initialMCQs,
      conversation: [],
    });

    await newInterview.save();

    if (questionFormat === "MCQ") {
      await saveMCQSession(newInterview._id.toString(), {
        questions: initialMCQs,
        answers: {},
      });
    }

    res.status(201).json(newInterview);
  } catch (error) {
    console.error("Error in createInterview:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMCQState = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid interview ID format" });
    }

    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });
    if (interview.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

    let session = await getMCQSession(id);
    if (!session || !session.questions || session.questions.length === 0) {
      let questions = interview.mcqQuestions && interview.mcqQuestions.length > 0
        ? interview.mcqQuestions
        : await generateMCQBatch(interview.category, interview.difficulty, 10);

      if (!interview.mcqQuestions || interview.mcqQuestions.length === 0) {
        interview.mcqQuestions = questions;
        await interview.save();
      }

      session = { questions, answers: {} };
      await saveMCQSession(id, session);
    }

    res.status(200).json({
      category: interview.category,
      difficulty: interview.difficulty,
      duration: interview.duration,
      status: interview.status,
      questions: session.questions,
    });
  } catch (error) {
    console.error("Error in getMCQState:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const submitMCQAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionId, selectedOption } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid interview ID format" });
    }

    const interview = await Interview.findById(id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });
    if (interview.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

    let session = await getMCQSession(id);
    if (!session || !session.questions) {
      session = { questions: interview.mcqQuestions || [], answers: {} };
    }

    const qIndex = session.questions.findIndex((q) => q.id === questionId);
    if (qIndex === -1) {
      return res.status(400).json({ message: "Question not found in active session" });
    }

    const question = session.questions[qIndex];
    const normalizedSelected = (selectedOption || "").trim().toUpperCase().charAt(0);
    const normalizedCorrect = (question.correctOption || "").trim().toUpperCase().charAt(0);
    const isCorrect = normalizedSelected === normalizedCorrect;

    // Record answer in Redis
    session = await recordMCQAnswer(id, questionId, selectedOption, isCorrect);

    // Sync answer into MongoDB Interview model
    const dbQIndex = interview.mcqQuestions.findIndex((q) => q.id === questionId);
    if (dbQIndex !== -1) {
      interview.mcqQuestions[dbQIndex].userAnswer = selectedOption;
      interview.mcqQuestions[dbQIndex].isCorrect = isCorrect;
      await interview.save();
    }

    // Trigger look-ahead pre-fetch if candidate is 2 questions away from current end
    if (qIndex >= session.questions.length - 2) {
      console.log(`⚡ Look-ahead trigger: Candidate at Q${qIndex + 1} of ${session.questions.length}. Pre-fetching next 10 MCQs...`);
      generateMCQBatch(
        interview.category,
        interview.difficulty,
        10,
        session.questions.map((q) => q.question)
      ).then(async (newQuestions) => {
        await appendMCQQuestions(id, newQuestions);
        await Interview.findByIdAndUpdate(id, { $push: { mcqQuestions: { $each: newQuestions } } });
      }).catch((err) => console.error("Failed to pre-fetch MCQs:", err));
    }

    res.status(200).json({
      questionId,
      isCorrect,
      correctOption: question.correctOption,
      explanation: question.explanation,
      totalQuestions: session.questions.length,
    });
  } catch (error) {
    console.error("Error in submitMCQAnswer:", error);
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
      userMessage = interview.questionFormat === "MCQ"
        ? "Hello, I am ready to start the MCQ interview."
        : "Hello, I am ready to start my interview.";
    }

    if (userMessage) {
      interview.conversation.push({ role: "user", content: userMessage });
    }

    // Build chat history for Gemini as a transcript string
    const transcript = interview.conversation.map(msg => `${msg.role === 'user' ? 'CANDIDATE' : 'INTERVIEWER'}: ${msg.content}`).join("\n\n");

    const activePrompt = interview.questionFormat === "MCQ" ? MCQ_SYSTEM_PROMPT : INTERVIEW_SYSTEM_PROMPT;
    const systemInstruction = `${activePrompt}\n\nThe interview category is ${interview.category}. The target difficulty is ${interview.difficulty}. Start or continue the interview accordingly. Keep responses concise.`;

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

    if (interview.questionFormat === "MCQ") {
      let session = await getMCQSession(id);
      const questions = session?.questions || interview.mcqQuestions || [];
      const answered = questions.filter((q) => q.userAnswer);
      const correctCount = answered.filter((q) => q.isCorrect).length;
      const skippedCount = answered.filter((q) => q.userAnswer === "SKIPPED").length;
      const totalCount = Math.max(1, answered.length);
      const scorePercentage = Math.round((correctCount / totalCount) * 100);

      const wrongOrSkipped = answered.filter((q) => !q.isCorrect || q.userAnswer === "SKIPPED");

      if (wrongOrSkipped.length > 0) {
        const wrongPrompt = `You are an expert technical interviewer reviewing a candidate's MCQ interview session in ${interview.category} (${interview.difficulty} level).
The candidate answered ${correctCount} correctly, missed ${wrongOrSkipped.length - skippedCount} incorrectly, and skipped ${skippedCount} question(s).

Here is the list of missed or skipped questions:
${wrongOrSkipped.map((q, i) => `${i + 1}. Question: "${q.question}"\nCandidate Action: ${q.userAnswer === "SKIPPED" ? "SKIPPED" : `Answered Option ${q.userAnswer}`}\nCorrect Option: ${q.correctOption}\nExplanation: ${q.explanation}`).join("\n\n")}

Provide a concise, focused report card:
1. Identify key strengths based on correctly answered questions.
2. For each missed or skipped question, provide a sharp, to-the-point explanation of why the correct answer is valid and the exact topic to review.

Return EXACTLY ONE valid JSON object with format:
{
  "score": {
    "overall": ${scorePercentage},
    "technical": ${scorePercentage},
    "problemSolving": ${scorePercentage},
    "communication": 100,
    "confidence": 100
  },
  "feedback": {
    "strengths": ["Answered ${correctCount} out of ${answered.length} MCQs correctly"],
    "weaknesses": ["Missed/Skipped ${wrongOrSkipped.length} MCQ questions (${skippedCount} skipped)"],
    "topicsToImprove": ["${interview.category} core concepts"],
    "learningResources": ["Review documentation for ${interview.category}"],
    "suggestedNext": "Focus on reviewing missed and skipped topics",
    "general": "Scored ${scorePercentage}% on ${interview.category} MCQ interview."
  }
}`;
        try {
          let reviewText = await generateWithFallback(wrongPrompt);
          let cleanedText = cleanJsonText(reviewText);
          const parsed = JSON.parse(cleanedText);
          interview.score = parsed.score;
          interview.feedback = parsed.feedback;
        } catch (e) {
          console.error("Failed to parse MCQ feedback JSON:", e);
          interview.score = { overall: scorePercentage, technical: scorePercentage, problemSolving: scorePercentage, communication: 100, confidence: 100 };
          interview.feedback = {
            strengths: [`Answered ${correctCount} out of ${answered.length} questions correctly`],
            weaknesses: wrongOrSkipped.map((q) => `${q.userAnswer === "SKIPPED" ? "Skipped" : "Missed"} question: "${q.question}"`),
            topicsToImprove: [interview.category],
            learningResources: [`${interview.category} revision`],
            suggestedNext: "Review missed and skipped concepts",
            general: `You scored ${scorePercentage}% in your ${interview.category} MCQ session.`
          };
        }
      } else {
        interview.score = { overall: 100, technical: 100, problemSolving: 100, communication: 100, confidence: 100 };
        interview.feedback = {
          strengths: [`Perfect score! Answered all ${answered.length} questions correctly.`],
          weaknesses: [],
          topicsToImprove: [],
          learningResources: [],
          suggestedNext: "Try a higher difficulty level session.",
          general: `Outstanding! Perfect 100% score on your ${interview.category} MCQ interview.`
        };
      }

      interview.status = "Completed";
      await interview.save();

      // Clean up Redis key upon completion
      await clearMCQSession(id);

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
    let cleanedText = cleanJsonText(reviewText);

    let parsedFeedback;
    try {
      parsedFeedback = JSON.parse(cleanedText);
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
      .select("-conversation")
      .lean();

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

    const interview = await Interview.findById(id).lean();
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

    const deleted = await Interview.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ message: "Interview not found or unauthorized" });

    res.status(200).json({ message: "Interview deleted successfully" });
  } catch (error) {
    console.error("Error in deleteInterview:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= TOPIC MANAGEMENT CONTROLLERS =================

export const getInterviewTopics = async (req, res) => {
  try {
    let topics = await Topic.find({}).sort({ createdAt: 1 }).lean();

    // Seed default topics if collection is empty
    if (topics.length === 0) {
      console.log("Seeding default interview topics...");
      const defaultDocs = DEFAULT_TOPICS.map((t) => ({
        name: t.name,
        domain: t.domain,
        description: `Mock interview sessions for ${t.name}`,
        isDefault: true,
      }));
      topics = await Topic.insertMany(defaultDocs);
    } else {
      // Ensure missing default topics are seeded and existing default topics have domains
      const existingNames = new Set(topics.map((t) => t.name.toLowerCase()));
      const missingDefaults = DEFAULT_TOPICS.filter((t) => !existingNames.has(t.name.toLowerCase()));
      if (missingDefaults.length > 0) {
        const defaultDocs = missingDefaults.map((t) => ({
          name: t.name,
          domain: t.domain,
          description: `Mock interview sessions for ${t.name}`,
          isDefault: true,
        }));
        const addedDocs = await Topic.insertMany(defaultDocs);
        topics = [...topics, ...addedDocs];
      }
    }

    res.status(200).json(topics);
  } catch (error) {
    console.error("Error in getInterviewTopics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addInterviewTopic = async (req, res) => {
  try {
    const { name, description, domain = "Core Subjects" } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Topic name is required" });
    }

    const trimmedName = name.trim();
    const existing = await Topic.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, "i") } }).lean();
    if (existing) {
      return res.status(400).json({ message: "Topic with this name already exists" });
    }

    const newTopic = new Topic({
      name: trimmedName,
      description: description?.trim() || "",
      domain: domain || "Core Subjects",
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

    const topic = await Topic.findByIdAndDelete(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error("Error in deleteInterviewTopic:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

