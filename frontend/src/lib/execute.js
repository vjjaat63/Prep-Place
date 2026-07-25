import axiosInstance from "./axios.js";

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const response = await axiosInstance.post("/execute", {
      language,
      code,
    });

    const data = response.data;

    // JDoodle returns 200 statusCode in the JSON body when execution is successful
    if (data.statusCode !== 200) {
      return {
        success: false,
        output: data.output || "",
        error: data.error || `Execution failed with status: ${data.statusCode}`,
      };
    }

    return {
      success: true,
      output: data.output || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || `Failed to execute code: ${error.message}`,
    };
  }
}
