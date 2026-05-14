import { validationResult } from "express-validator";
import { AppError } from "../../errors/AppError.js";


export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        "Validation errors",
        400,
        errors.array()
      )
    );
  }

  next();
};