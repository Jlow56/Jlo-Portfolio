import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

export const auth = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return next(new AppError("Invalid or expired token", 401));
  }
};