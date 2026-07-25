import { generateWithFallback } from "../lib/gemini.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import mammoth from "mammoth";
import ResumeAnalysis from "../models/ResumeAnalysis.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";
import stream from "stream";

const uploadToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: `resumes/${Date.now()}_${originalname}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
          bytes: result.bytes,
          format: result.format
        });
      }
    );
    uploadStream.end(buffer);
  });
};

const RESUME_SYSTEM_PROMPT = `You are an expert technical recruiter and ATS (Applicant Tracking System) software.
Your task is to analyze the following resume and return a structured JSON report.
Focus your analysis on:
- Project descriptions, impact, and achievements.
- Technology choices and missing skills.
- Use of action verbs and quantified results.

Return EXACTLY ONE valid JSON object with the following structure, and nothing else (no markdown wrappers like \`\`\`json):
{
  "atsScore": 0-100,
  "summary": "Brief 2-3 sentence overall summary",
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "missingSkills": ["...", "..."],
  "grammar": ["...", "..."],
  "projectFeedback": "Detailed feedback on projects...",
  "experienceFeedback": "Detailed feedback on experience...",
  "educationFeedback": "Detailed feedback on education...",
  "formattingSuggestions": ["...", "..."],
  "actionableImprovements": ["...", "..."],
  "overallVerdict": "Final verdict on the resume's quality"
}

Do NOT hallucinate or invent skills not present in the text.`;

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    const { originalname, buffer, mimetype } = req.file;
    let rawText = "";

    if (mimetype === "application/pdf") {
      const data = await pdfParse(buffer);
      rawText = data.text;
    } else if (
      mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimetype === "application/msword"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else {
      return res.status(400).json({ message: "Unsupported file type. Please upload a PDF or DOCX." });
    }

    if (!rawText || rawText.trim() === "") {
      return res.status(400).json({ message: "Could not extract text from the file." });
    }

    const prompt = `${RESUME_SYSTEM_PROMPT}\n\n--- RESUME TEXT ---\n${rawText}`;

    let reviewText = await generateWithFallback(prompt);
    
    // Cleanup possible markdown formatting
    if (reviewText.startsWith("\`\`\`json")) {
        reviewText = reviewText.replace(/^\`\`\`json\n/, "").replace(/\n\`\`\`$/, "");
    }

    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(reviewText);
    } catch (e) {
      console.error("Failed to parse Gemini feedback JSON:", e, reviewText);
      return res.status(500).json({ message: "Failed to generate structured report." });
    }

    // Check if user already has a resume
    const existingResume = await ResumeAnalysis.findOne({ userId: req.user._id });
    if (existingResume && existingResume.publicId) {
      try {
        await cloudinary.uploader.destroy(existingResume.publicId, { resource_type: "raw" });
        console.log(`Deleted old resume from Cloudinary: ${existingResume.publicId}`);
      } catch (err) {
        console.error("Failed to delete old resume from Cloudinary:", err);
      }
    }

    let cloudinaryData = null;
    try {
      cloudinaryData = await uploadToCloudinary(buffer, originalname);
    } catch (uploadError) {
      console.error("Failed to upload resume to Cloudinary:", uploadError);
      return res.status(500).json({ message: "Failed to upload resume to Cloudinary" });
    }

    const updatedAnalysis = await ResumeAnalysis.findOneAndUpdate(
      { userId: req.user._id },
      {
        userId: req.user._id,
        originalName: originalname,
        resumeUrl: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
        fileSize: cloudinaryData.bytes,
        atsScore: parsedAnalysis.atsScore || 0,
        analysis: parsedAnalysis,
      },
      { new: true, upsert: true }
    );

    res.status(201).json(updatedAnalysis);
  } catch (error) {
    console.error("Error in analyzeResume:", error);
    res.status(500).json({ message: "Internal server error during analysis" });
  }
};

export const getResume = async (req, res) => {
  try {
    const resume = await ResumeAnalysis.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error("Error in getResume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const resume = await ResumeAnalysis.findOne({ userId: req.user._id });
    if (!resume || !resume.resumeUrl) {
      return res.status(404).json({ message: "No resume found to download" });
    }
    // Return the secure URL for frontend to handle download
    res.status(200).json({ url: resume.resumeUrl, filename: resume.originalName });
  } catch (error) {
    console.error("Error in downloadResume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findById(req.params.id);
    if (!analysis) return res.status(404).json({ message: "Analysis not found" });
    if (analysis.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

    res.status(200).json(analysis);
  } catch (error) {
    console.error("Error in getResumeById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteResumeAnalysis = async (req, res) => {
  try {
    const analysis = await ResumeAnalysis.findById(req.params.id);
    if (!analysis) return res.status(404).json({ message: "Analysis not found" });
    if (analysis.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Unauthorized" });

    if (analysis.publicId) {
      try {
        await cloudinary.uploader.destroy(analysis.publicId, { resource_type: "raw" });
      } catch (err) {
        console.error("Failed to delete from Cloudinary:", err);
      }
    }

    await ResumeAnalysis.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Analysis deleted successfully" });
  } catch (error) {
    console.error("Error in deleteResumeAnalysis:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
