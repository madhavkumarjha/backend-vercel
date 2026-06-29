// utils/asyncHandlerAndError.js
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  // Mongo duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]; // e.g. "username" or "email"
    return res.status(400).json({
      success: false,
      message: `${field} already exists. Please choose another ${field}.`
    });
  }

  // JWT errors
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, message: "Your session has expired. Please log in again." });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ success: false, message: "Invalid authentication token." });
  }

  // Default fallback
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong. Please try again."
  });
};

