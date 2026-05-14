import { body } from "express-validator";

/**
 * Création d’un projet
 */
export const createProjectValidator = [

  body("name")
    .notEmpty()
    .withMessage("Nom requis")
    .isLength({ min: 2, max: 120 }),

  body("technology")
    .isArray()
    .withMessage("technology doit être un tableau"),

  body("technology.*")
    .isString(),

  body("category")
    .notEmpty()
    .isString(),

  body("cover")
    .notEmpty()
    .isString(),

  body("image")
    .isArray(),

  body("image.*")
    .isString(),

  body("link")
    .optional()
    .isURL(),

  body("gitHub")
    .notEmpty()
    .isURL(),

  body("shortDescription")
    .notEmpty()
    .isString()
    .isLength({ max: 300 }),

  body("description")
    .notEmpty()
    .isString(),

  body("problematic")
    .notEmpty()
    .isString(),

  body("solution")
    .notEmpty()
    .isString()
];


/**
 * Mise à jour d’un projet
 */
export const updateProjectValidator = [

  body("name")
    .optional()
    .isLength({ min: 2, max: 120 }),

  body("technology")
    .optional()
    .isArray(),

  body("technology.*")
    .optional()
    .isString(),

  body("category")
    .optional()
    .isString(),

  body("cover")
    .optional()
    .isString(),

  body("image")
    .optional()
    .isArray(),

  body("image.*")
    .optional()
    .isString(),

  body("link")
    .optional()
    .isURL(),

  body("gitHub")
    .optional()
    .isURL(),

  body("shortDescription")
    .optional()
    .isString()
    .isLength({ max: 300 }),

  body("description")
    .optional()
    .isString(),

  body("problematic")
    .optional()
    .isString(),

  body("solution")
    .optional()
    .isString()
];