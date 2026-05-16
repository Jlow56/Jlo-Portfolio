import { Router } from "express";
import { param } from "express-validator";
import { validate } from "../middlewares/validators/validate.js";
import { cache } from "../middlewares/cache.middleware.js";
import { getAllProjects, getProjectBySlug, getProjectsByCategory } from "./project.controller.js";

const router = Router();
const CATS = ["site-web","application","api-backend","seo-optimisation","gestion-projet"];


router.get("/", cache, getAllProjects);
router.get("/category/:category", param("category").isIn(CATS).withMessage("Catégorie invalide"), validate, cache, getProjectsByCategory);
router.get("/:slug", cache, getProjectBySlug);

export default router; 