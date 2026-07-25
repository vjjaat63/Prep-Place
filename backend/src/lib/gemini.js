import { GoogleGenAI } from "@google/genai";
import { ENV } from "./env.js";

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

// Ordered list of models to use for fallback based on provided quota data
const FALLBACK_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-pro",
  "gemini-3.1-flash-lite",
  "gemini-3-flash",
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2-flash",
  "gemini-2-flash-lite",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b"
];

export const generateWithFallback = async (prompt) => {
  let lastError;
  
  for (const model of FALLBACK_MODELS) {
    try {
      console.log(`[Gemini] Attempting to use model: ${model}`);
      const interaction = await ai.interactions.create({
        model: model,
        input: prompt,
      });
      console.log(`[Gemini] Successfully generated response using model: ${model}`);
      return interaction.output_text;
    } catch (error) {
      console.warn(`[Gemini] Model ${model} failed:`, error.message || error);
      lastError = error;
      
      // If it's a rate limit / quota error, we continue to the next model
      const isRateLimit = 
        error.status === 429 || 
        error.statusCode === 429 || 
        (error.message && error.message.toLowerCase().includes('quota')) ||
        (error.message && error.message.toLowerCase().includes('too many requests'));
        
      if (!isRateLimit) {
        // If it's another type of error (like a bad request or auth issue), we probably shouldn't keep trying
        throw error;
      }
      
      console.log(`[Gemini] Falling back to the next model...`);
    }
  }
  
  // If all models fail
  throw new Error(`All Gemini models exhausted. Last error: ${lastError?.message || 'Rate limit exceeded'}`);
};
