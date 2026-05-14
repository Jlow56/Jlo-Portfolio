import mongoose from "mongoose";
import Pdf from "./Pdf.js";
import { getGridFSBucket } from "../config/gridfs.js";
import { pdfCreateDTO, pdfToDTO, pdfsToDTO } from "./pdf.dto.js";
import { AppError } from "../errors/AppError.js";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { Readable } from "stream";

// PUBLIC — download
export const downloadPdf = asyncHandler(async (req, res, next) => {
  const pdf = await Pdf.findById(req.params.id);

  if (!pdf || !pdf.isPublic) {
    throw new AppError("PDF not found or not public", 404);
  }

  res.set("Content-Type", "application/pdf");
  res.set("Content-Disposition", `inline; filename="${pdf.title}.pdf"`);

  const stream = getGridFSBucket().openDownloadStream(
    new mongoose.Types.ObjectId(pdf.gridFsId)
  );

  stream.on("error", (err) =>
    next(new AppError(err.message || "File read error", 500))
  );

  stream.pipe(res);
});

export const getPdfById = asyncHandler(async (req, res) => {
  const pdf = await Pdf.findById(req.params.id).lean();

  if (!pdf || !pdf.isPublic) {
    throw new AppError("PDF introuvable", 404);
  }

  res.status(200).json({ data: pdfToDTO(pdf), error: null });
});

// ADMIN — upload
export const uploadPdf = asyncHandler(async (req, res) => {
  if (!req.files?.length) {
    throw new AppError("No files uploaded", 400);
  }

  const userId = req.user.sub;

  const created = [];

  for (const file of req.files) {

    const uploadStream = getGridFSBucket().openUploadStream(file.originalname, {
      contentType: file.mimetype
    });

    const readable = new Readable();
    readable.push(file.buffer);
    readable.push(null);

    await new Promise((resolve, reject) => {
      readable
        .pipe(uploadStream)
        .on("error", reject)
        .on("finish", resolve);
    });

    const payload = pdfCreateDTO(req.body, uploadStream, userId);

    const doc = await Pdf.create(payload);

    created.push(doc);
  }

  res.status(201).json({
    data: pdfsToDTO(created),
    error: null
  });
});

// ADMIN — list
export const getPdfs = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 20);
  const skip = (page - 1) * limit;

  const [pdfs, total] = await Promise.all([
    Pdf.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Pdf.countDocuments()
  ]);

  res.status(200).json({
    data: pdfsToDTO(pdfs),
    meta: { page, limit, total, pages: Math.ceil(total / limit) },
    error: null
  });
});

// ADMIN — delete
export const deletePdf = asyncHandler(async (req, res) => {
  const pdf = await Pdf.findById(req.params.id);

  if (!pdf) throw new AppError("PDF introuvable", 404);
  
  await getGridFSBucket().delete(new mongoose.Types.ObjectId(pdf.gridFsId));
 
  await Pdf.findByIdAndDelete(req.params.id);

  res.status(200).json({ data: null, error: null });
});

// ADMIN — update
export const updatePdf = asyncHandler(async (req, res) => {
  // Whitelist explicite des champs modifiables
  const allowedFields = {
    title: req.body.title,
    type: req.body.type,
    isPublic: req.body.isPublic,
  };

  // Supprimer les undefined
  Object.keys(allowedFields).forEach(
    k => allowedFields[k] === undefined && delete allowedFields[k]
  );

  const updated = await Pdf.findByIdAndUpdate(
    req.params.id,
    allowedFields,
    { new: true, runValidators: true }
  );

  if (!updated) throw new AppError("PDF introuvable", 404);

  res.status(200).json({ data: pdfToDTO(updated), error: null });
});


