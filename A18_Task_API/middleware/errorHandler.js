// middleware/errorHandler.js
// Catches any unhandled errors and sends a clean response

const errorHandler = (err, req, res, next) => {
  // Determine status code (default to 500 if not set)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Send error as JSON
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;