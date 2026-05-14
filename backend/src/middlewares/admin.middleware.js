import { AppError } from "../errors/AppError.js";

export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    throw new AppError("Forbidden", 403);
  }
  next();
};