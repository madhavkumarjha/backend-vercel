import mongoose from "mongoose";
import config from "./config.js";

let cachedDb = null; // Sahi variable name

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const opts = { bufferCommands: false };
  // Connection logic
  const conn = await mongoose.connect(config.mongoURI, opts);
  cachedDb = conn;
  console.log("Database connected successfully")
  return conn;
}

export default connectToDatabase;