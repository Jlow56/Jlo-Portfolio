import mongoose from "mongoose";
import { AppError } from "../errors/AppError.js";

let gridFSBucket;

const initGridFS = (conn) => {
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "pdfs" });
};

const getGridFSBucket = () => {
  if (!gridFSBucket) throw new AppError("Storage not initialized", 503);
  return gridFSBucket;
};

export { getGridFSBucket, initGridFS };