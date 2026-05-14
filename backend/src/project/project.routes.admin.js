import express from "express";

import { auth } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

import { createProjectValidator, updateProjectValidator } from "../middlewares/validators/project.validator.js";
import { createProject, updateProject, deleteProject } from "./project.controller.js";

import { validateObjectId } from "../middlewares/validators/validateObjectId.middleware.js";
import { validate } from "../middlewares/validators/validate.js";

const router = express.Router();

router.post("/", auth, adminOnly, createProjectValidator, validate, createProject);
router.put("/:id", auth, adminOnly, validateObjectId, updateProjectValidator, validate, updateProject);
router.delete("/:id", auth, adminOnly, validateObjectId, deleteProject );

export default router;