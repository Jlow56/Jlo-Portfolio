import express from "express";
import { login, logout, refresh } from "./auth.controller.js";

import { loginValidator } from "../middlewares/validators/user.validator.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validators/validate.js";

const router = express.Router();

router.post("/login", loginValidator, validate, login);
router.post("/logout", auth, logout);
router.post("/refresh", refresh);

export default router;