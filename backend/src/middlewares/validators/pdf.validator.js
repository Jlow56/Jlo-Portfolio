import { body } from "express-validator";

export const uploadPdfValidator = [
  body("title").notEmpty().withMessage("title requis").isString().trim(),
  body("project").notEmpty().isMongoId().withMessage("project doit être un ObjectId valide"),
  body("type")
    .notEmpty()
    .isIn(["specification", "rapport", "presentation"])
    .withMessage("type invalide"),
];