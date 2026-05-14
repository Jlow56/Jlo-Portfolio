import 'dotenv/config';
import app from "./app.js";
import connectDB from "./config/database.js";
import { initGridFS } from "./config/gridfs.js";
import mongoose from "mongoose";

const startServer = async () => {
  try {
    if (!process.env.CLIENT_URL) {
      throw new Error("CLIENT_URL not defined");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not defined");
    }

    const conn = await connectDB();
    initGridFS(conn);

    const PORT = process.env.PORT || 3000;

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received. Shutting down gracefully...");

      server.close(async () => {
        await mongoose.connection.close();
        console.log("MongoDB connection closed.");
        process.exit(0);
      });
    });
    process.on("SIGINT", () => process.emit("SIGTERM"));

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
