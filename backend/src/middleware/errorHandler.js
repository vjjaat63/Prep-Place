/**
 * Centralized Global Error Handler Middleware
 * Handles Mongoose ValidationErrors, MongoDB duplicate keys (code 11000), CastErrors, and generic errors.
 */
export const errorHandler = (err, req, res, next) => {
  console.error("!!! Global Error Handler:", err.name, "-", err.message);

  // Mongoose Validation Error (maxlength, minlength, required, etc.)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      message: messages.join(", "),
    });
  }

  // MongoDB Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(400).json({
      message: `A record with this ${field} already exists.`,
    });
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // Default Fallback Server Error
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : (err.status || 500);
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};
