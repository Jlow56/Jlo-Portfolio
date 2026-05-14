import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["specification", "rapport", "presentation"], required: true },
    gridFsId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    isPublic: { type: Boolean, default: false },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  
  { timestamps: true }
);

export default mongoose.model("Pdf", pdfSchema);