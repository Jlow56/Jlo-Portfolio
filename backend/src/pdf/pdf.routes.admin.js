import express from "express";

import { auth } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

import  upload  from "../middlewares/upload.middleware.js";
import { uploadPdfValidator } from "../middlewares/validators/pdf.validator.js";

import { validate } from "../middlewares/validators/validate.js";
import { validateObjectId } from "../middlewares/validators/validateObjectId.middleware.js";

import { uploadPdf, getPdfs, deletePdf, updatePdf } from "./pdf.controller.js";

const router = express.Router();

router.post("/", auth, adminOnly, upload.array("files", 5), uploadPdfValidator, validate, uploadPdf);
router.get("/", auth, adminOnly, getPdfs);
router.delete("/:id", auth, adminOnly, validateObjectId, deletePdf);
router.put("/:id", auth, adminOnly, validateObjectId, updatePdf);



export default router;