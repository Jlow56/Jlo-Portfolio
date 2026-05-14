import mongoose from "mongoose";
import { AppError } from "../../errors/AppError.js";

export const validateObjectId = (req, res, next) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid ID", 400));
  }

  next();
};