import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin"], default: "admin", required: true },
  refreshTokenVersion: { type: Number, default: 0 }
}, 
{ timestamps: true });

export default mongoose.model("User", userSchema);
