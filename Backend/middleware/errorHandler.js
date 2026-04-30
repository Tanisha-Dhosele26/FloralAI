module.exports = (err, req, res, next) => {
  console.error("💥 ERROR:", err.message);

  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};
