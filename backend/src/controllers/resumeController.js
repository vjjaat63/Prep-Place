import { generateWithFallback } from "../lib/gemini.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import mammoth from "mammoth";
import ResumeAnalysis from "../models/ResumeAnalysis.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";
import stream from "stream";

const uploadToCloudinary = (buffer, originalname, userId) => {
  return new Promise((resolve, reject) => {
    const safeName = originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: `Prep Place/resumes/${userId}`,
        public_id: `${Date.now()}_${safeName}`,
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

const getResumeSystemPrompt = (targetRole = "Software Engineer", jobDescription = null) => {
  const today = new Date().toISOString().split("T")[0]; // e.g. "2026-08-02"
  const hasJD = jobDescription && jobDescription.trim().length > 0;

  const keywordSection = hasJD
    ? `### 2. Keyword & Job Description Match (25 points)
A job description has been provided for the role of "${targetRole}". Score this section based on how well the resume matches it:
- Identify the key required skills, technologies, and qualifications from the job description.
- Award up to 15 pts for how many of those required keywords/skills appear in the resume.
- Award up to 5 pts if the candidate's experience level matches the role's requirements.
- Award up to 5 pts if the resume's language mirrors the job description's terminology.
- List any important keywords from the JD that are missing from the resume in "missingSkills".`
    : `### 2. Keyword Density & Role Relevance (25 points)
No job description was provided, so evaluate strictly against standard requirements for the target role of "${targetRole}":
- Presence of core skills, tools, and technologies expected for a "${targetRole}" → up to 10 pts
- Use of industry-standard keywords and terminology for a "${targetRole}" → up to 10 pts
- Avoidance of vague buzzwords with no supporting evidence → up to 5 pts`;

  return `You are an expert technical recruiter and ATS (Applicant Tracking System) software evaluating a candidate specifically for the position of: "${targetRole}".
Today's date is ${today}. Use this to correctly determine whether dates on the resume are in the past, present, or future.
Any date on or before ${today} should be treated as a past or present date — do NOT flag these as future dates.
Only flag a date as a "future date" if it is strictly after ${today}.

CRITICAL INSTRUCTION: Tailor all your analysis, suggestions, recommendations, and missing skill lists specifically for the candidate's target job role of "${targetRole}".

Your task is to analyze the following resume${hasJD ? " against the provided job description and target role" : " for the target role"} and return a structured JSON report.

## ATS SCORE CALCULATION (atsScore: 0–100)
You MUST compute the atsScore using the following weighted rubric. Be strict and realistic — do not inflate scores. Score each category independently, then sum them.

### 1. Formatting & Structure (20 points)
Award points for:
- Clear section headings (Contact, Summary/Objective, Experience, Education, Skills, Projects) → up to 6 pts
- Consistent date formatting across all entries → up to 4 pts
- No tables, images, or complex layouts that ATS cannot parse → up to 4 pts
- Appropriate resume length (1 page for <3 yrs exp, 2 pages for senior) → up to 3 pts
- Contact info present (email, phone, LinkedIn/GitHub) → up to 3 pts

${keywordSection}

### 3. Work Experience Quality (25 points)
Award points for:
- Use of strong action verbs to start bullet points (e.g., "Engineered", "Optimized", "Led") → up to 8 pts
- Quantified achievements with metrics (%, $, numbers, scale) → up to 10 pts
- Clear indication of impact and responsibility level relevant to a ${targetRole} → up to 7 pts

### 4. Projects Section (15 points)
Award points for:
- At least 2 substantial projects described → up to 5 pts
- Technologies/stack relevant to a ${targetRole} clearly listed for each project → up to 5 pts
- Links to GitHub, live demos, or deployment mentioned → up to 5 pts

### 5. Education (10 points)
Award points for:
- Degree, institution, graduation year clearly stated → up to 6 pts
- Relevant coursework, GPA (if strong), or academic achievements → up to 4 pts

### 6. Grammar & Clarity (5 points)
Award points for:
- No spelling or grammatical errors → up to 3 pts
- Clear, concise language (no run-on sentences) → up to 2 pts

Sum all category scores for the final atsScore. Deduct points for red flags such as: employment gaps with no explanation, inconsistent dates, generic objective statements, or personal pronouns ("I", "my").

Focus your qualitative analysis on:
- Project descriptions, impact, and achievements tailored to ${targetRole}.
- Technology choices and specific missing skills/tools required for a successful ${targetRole}.
- Use of action verbs and quantified results.

In "missingSkills", list specific key technical skills, tools, frameworks, and methodologies required for a ${targetRole} that are missing or under-emphasized in this resume.

Return EXACTLY ONE valid JSON object with the following structure, and nothing else (no markdown wrappers like \`\`\`json):
{
  "atsScore": 0-100,
  "scoreBreakdown": {
    "formatting": 0-20,
    "keywords": 0-25,
    "experience": 0-25,
    "projects": 0-15,
    "education": 0-10,
    "grammar": 0-5
  },
  "jobMatchMode": ${hasJD ? "true" : "false"},
  "targetRole": "${targetRole}",
  "summary": "Brief 2-3 sentence overall summary of fit for ${targetRole}",
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "missingSkills": ["...", "..."],
  "grammar": ["...", "..."],
  "projectFeedback": "Detailed feedback on projects and their relevance to ${targetRole}...",
  "experienceFeedback": "Detailed feedback on experience and impact for ${targetRole}...",
  "educationFeedback": "Detailed feedback on education...",
  "formattingSuggestions": ["...", "..."],
  "actionableImprovements": ["...", "..."],
  "overallVerdict": "Final verdict on the resume's quality for a ${targetRole} position"
}

Do NOT hallucinate or invent skills not present in the text. Be honest and critical — a score above 80 should be genuinely rare and reserved for excellent resumes.`;
};

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No resume file uploaded" });
    }

    const { originalname, buffer, mimetype } = req.file;
    const targetRole = req.body?.targetRole?.trim() || "Software Engineer";
    const jobDescription = req.body?.jobDescription?.trim() || null;
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

    const jdSection = jobDescription
      ? `\n\n--- JOB DESCRIPTION TO MATCH AGAINST ---\n${jobDescription}`
      : "";

    const prompt = `${getResumeSystemPrompt(targetRole, jobDescription)}\n\n--- RESUME TEXT ---\n${rawText}${jdSection}`;

    let reviewText = await generateWithFallback(prompt);
    
    // Cleanup possible markdown formatting
    if (reviewText.startsWith("```json")) {
        reviewText = reviewText.replace(/^```json\n/, "").replace(/\n```$/, "");
    }

    let parsedAnalysis;
    try {
      parsedAnalysis = JSON.parse(reviewText);
    } catch (e) {
      console.error("Failed to parse Gemini feedback JSON:", e, reviewText);
      return res.status(500).json({ message: "Failed to generate structured report." });
    }

    let cloudinaryData = null;
    try {
      cloudinaryData = await uploadToCloudinary(buffer, originalname, req.user._id);
    } catch (uploadError) {
      console.error("Failed to upload resume to Cloudinary:", uploadError);
      return res.status(500).json({ message: "Failed to upload resume to Cloudinary" });
    }

    const newAnalysis = await ResumeAnalysis.create({
      userId: req.user._id,
      targetRole,
      originalName: originalname,
      resumeUrl: cloudinaryData.secure_url,
      publicId: cloudinaryData.public_id,
      fileSize: cloudinaryData.bytes,
      atsScore: parsedAnalysis.atsScore || 0,
      analysis: parsedAnalysis,
    });

    res.status(201).json(newAnalysis);
  } catch (error) {
    console.error("Error in analyzeResume:", error);
    res.status(500).json({ message: "Internal server error during analysis" });
  }
};

export const getResume = async (req, res) => {
  try {
    const resumes = await ResumeAnalysis.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error in getResume:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadResume = async (req, res) => {
  try {
    const { id } = req.params;
    let resume;
    if (id) {
      resume = await ResumeAnalysis.findById(id);
    } else {
      resume = await ResumeAnalysis.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
    }

    if (!resume || !resume.resumeUrl) {
      return res.status(404).json({ message: "No resume found to download" });
    }
    if (resume.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

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
