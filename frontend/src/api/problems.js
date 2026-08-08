import axiosInstance from "../lib/axios";

// Client-side in-memory cache to make page switches 0ms instant
const problemCache = new Map();
let allProblemsCache = null;

export const problemsApi = {
  /**
   * Get all problems summary (cached in memory on client + Redis on server)
   */
  getAllProblems: async (forceRefresh = false) => {
    if (!forceRefresh && allProblemsCache) {
      return allProblemsCache;
    }
    try {
      const response = await axiosInstance.get("/problems");
      if (Array.isArray(response.data)) {
        allProblemsCache = response.data;
        return allProblemsCache;
      }
    } catch (error) {
      console.error("[Problems API] Error fetching problems summary:", error.message);
    }
    return allProblemsCache || [];
  },

  /**
   * Get a single problem by ID or slug (cached in memory on client + Redis on server)
   */
  getProblemById: async (id, forceRefresh = false) => {
    if (!forceRefresh && problemCache.has(id)) {
      return problemCache.get(id);
    }
    try {
      const response = await axiosInstance.get(`/problems/${id}`);
      if (response.data) {
        problemCache.set(id, response.data);
        if (response.data.problemId) {
          problemCache.set(response.data.problemId, response.data);
        }
        if (response.data._id) {
          problemCache.set(response.data._id, response.data);
        }
        return response.data;
      }
    } catch (error) {
      console.error(`[Problems API] Error fetching problem '${id}':`, error.message);
    }
    return problemCache.get(id) || null;
  },

  /**
   * Create a new problem (Admin Only)
   */
  createProblem: async (problemData) => {
    const response = await axiosInstance.post("/problems", problemData);
    allProblemsCache = null; // Invalidate client cache
    problemCache.clear();
    return response.data;
  },

  /**
   * Update an existing problem (Admin Only)
   */
  updateProblem: async (id, problemData) => {
    const response = await axiosInstance.put(`/problems/${id}`, problemData);
    allProblemsCache = null; // Invalidate client cache
    problemCache.delete(id);
    if (problemData.problemId) problemCache.delete(problemData.problemId);
    return response.data;
  },

  /**
   * Delete a problem (Admin Only)
   */
  deleteProblem: async (id) => {
    const response = await axiosInstance.delete(`/problems/${id}`);
    allProblemsCache = null; // Invalidate client cache
    problemCache.delete(id);
    return response.data;
  },

  clearClientCache: () => {
    allProblemsCache = null;
    problemCache.clear();
  },
};
