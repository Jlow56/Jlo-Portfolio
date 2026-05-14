import mongoose from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI manquant");
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connecté");

    return connection.connection;
  } catch (err) {
    console.error("Erreur connexion MongoDB");
    throw err;
  }
};

export default connectDB;