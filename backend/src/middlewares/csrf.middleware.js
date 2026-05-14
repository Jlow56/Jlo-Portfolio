import { AppError } from "../errors/AppError.js";

const SAFE_METHODS = ["GET", "HEAD", "OPTIONS"];

export const csrfProtection = (req, res, next) => {
  if (SAFE_METHODS.includes(req.method)) return next();

  const header = req.headers["x-requested-with"];
  if (header !== "XMLHttpRequest") {
    return next(new AppError("CSRF check failed", 403));
  }

  next();
};