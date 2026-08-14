import { GoogleGenAI } from "@google/genai";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const generateCodeReview = async (req, res) => {
  try {
    const { language, code, problemTitle, problemDesc, output, passed, failed } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!language || !code) {
      return res.status(400).json({ message: "Language and code are required" });
    }

    const passedNum = parseInt(passed) || 0;
    const failedNum = parseInt(failed) || 0;
    const totalTests = passedNum + failedNum;

    let score = 0;
    if (totalTests > 0) {
      score = (passedNum / totalTests) * 10;
    } else {
      score = 5; // Fallback if no tests or just compilation succeeded
    }

    // Format to 1 decimal place max
    score = Math.round(score * 10) / 10;

    let rating = "Needs Improvement";
    if (score >= 9) rating = "Excellent";
    else if (score >= 6) rating = "Good";

    const prompt = `You are an expert code reviewer. Please review the following code submission for the problem '${problemTitle}'. 
The problem description is: '${problemDesc}'. 
The user submitted this ${language} code:

\`\`\`${language}
${code}
\`\`\`

Execution output:
${output}

Tests passed: ${passed}, Tests failed: ${failed}.

Provide a concise JSON response containing:
- overallFeedback (string)
- timeComplexity (string, e.g. "O(n)")
- spaceComplexity (string)
- strengths (array of strings)
- suggestions (array of strings)
- edgeCases (array of strings)
- optimization (string)

RETURN EXACTLY ONE VALID JSON OBJECT AND NOTHING ELSE. DO NOT WRAP IN MARKDOWN BLOCKS.`;

    const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
    });

    const reviewText = interaction.output_text;

    if (!reviewText) {
      return res.status(500).json({ message: "Invalid response format from Gemini API" });
    }

    let cleanedText = reviewText.trim();
    if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
    }

    let parsedReview;
    try {
      parsedReview = JSON.parse(cleanedText);
    } catch (e) {
      console.warn("Failed to parse Gemini response as JSON, falling back to raw text", e);
      parsedReview = { rawText: reviewText };
    }

    // Attach calculated score and rating
    parsedReview.score = score;
    parsedReview.rating = rating;

    res.status(200).json({ review: parsedReview });
  } catch (error) {
    console.error("Error generating AI review:", error);
    res.status(500).json({ message: "Failed to generate AI review" });
  }
};
