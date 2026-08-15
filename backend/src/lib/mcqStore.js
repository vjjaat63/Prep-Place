import { redisClient } from "./redis.js";

const TTL_SECONDS = 7200; // 2 hours

// In-memory fallback map if Redis is not available
const fallbackStore = new Map();

const getKey = (interviewId) => `mcq_session:${interviewId}`;

export const saveMCQSession = async (interviewId, data) => {
  const key = getKey(interviewId);
  const jsonString = JSON.stringify(data);

  if (redisClient && redisClient.status === "ready") {
    try {
      await redisClient.set(key, jsonString, "EX", TTL_SECONDS);
      return;
    } catch (err) {
      console.error("❌ Redis error in saveMCQSession:", err.message);
    }
  }

  fallbackStore.set(key, { data, expiresAt: Date.now() + TTL_SECONDS * 1000 });
};

export const getMCQSession = async (interviewId) => {
  const key = getKey(interviewId);

  if (redisClient && redisClient.status === "ready") {
    try {
      const raw = await redisClient.get(key);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      console.error("❌ Redis error in getMCQSession:", err.message);
    }
  }

  const cached = fallbackStore.get(key);
  if (cached) {
    if (Date.now() > cached.expiresAt) {
      fallbackStore.delete(key);
      return null;
    }
    return cached.data;
  }

  return null;
};

export const appendMCQQuestions = async (interviewId, newQuestions) => {
  const session = await getMCQSession(interviewId);
  if (!session) return null;

  session.questions = [...(session.questions || []), ...newQuestions];
  await saveMCQSession(interviewId, session);
  return session;
};

export const recordMCQAnswer = async (interviewId, questionId, selectedOption, isCorrect) => {
  const session = await getMCQSession(interviewId);
  if (!session) return null;

  if (!session.answers) session.answers = {};
  session.answers[questionId] = { selectedOption, isCorrect };

  // Update question object
  const qIndex = session.questions.findIndex(q => q.id === questionId);
  if (qIndex !== -1) {
    session.questions[qIndex].userAnswer = selectedOption;
    session.questions[qIndex].isCorrect = isCorrect;
  }

  await saveMCQSession(interviewId, session);
  return session;
};

export const clearMCQSession = async (interviewId) => {
  const key = getKey(interviewId);

  if (redisClient && redisClient.status === "ready") {
    try {
      await redisClient.del(key);
    } catch (err) {
      console.error("❌ Redis error in clearMCQSession:", err.message);
    }
  }

  fallbackStore.delete(key);
};
