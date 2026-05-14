import { normalizeMongoError } from "./errorNormalizers.js";

export const errorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.status).json({
      data: null,
      error: {
        message: err.message,
        details: err.details || null
      }
    });
  }

  const normalized = normalizeMongoError(err) || { status: 500, message: "Internal Server Error", details: null };

  console.error("UNEXPECTED ERROR:", err);

  res.status(normalized.status).json({
    data: null,
    error: {
      message: normalized.message,
      details: normalized.details
    }
  });
};

export const asyncHandler = (fn) =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);