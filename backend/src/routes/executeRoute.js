import express from "express";
import { ENV } from "../lib/env.js";

const router = express.Router();

const JDOODLE_API = "https://api.jdoodle.com/v1/execute";

const LANGUAGE_IDS = {
  javascript: "nodejs",
  python: "python3",
  java: "java",
  cpp: "cpp17",
};

router.post("/", async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ success: false, error: "Language and code are required" });
  }

  const jdoodleLanguage = LANGUAGE_IDS[language] || language;

  try {
    const response = await fetch(JDOODLE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientId: ENV.JDOODLE_CLIENT_ID,
        clientSecret: ENV.JDOODLE_CLIENT_SECRET,
        script: code,
        language: jdoodleLanguage,
        versionIndex: "0",
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: `JDoodle HTTP error! status: ${response.status}`,
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, error: `Server error: ${error.message}` });
  }
});

export default router;
