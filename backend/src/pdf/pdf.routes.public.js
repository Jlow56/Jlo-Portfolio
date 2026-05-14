import express from "express";
import { downloadPdf } from "./pdf.controller.js";

const router = express.Router();

router.get("/:id/download", downloadPdf);

export default router;