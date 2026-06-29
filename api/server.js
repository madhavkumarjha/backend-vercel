import express from 'express';
import connectToDatabase from '../config/connectDB.js';
import config from '../config/config.js';
import cors from "cors";
import authRoutes from "../routes/auth.routes.js"
import { errorHandler } from '../utils/asyncHandlerAndError.js';

const app = express();
app.use(express.json());

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://backend-vercel-two-sand.vercel.app"
      : ["http://localhost:5173", "https://hoppscotch.io"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(errorHandler)

app.use("/api/auth", authRoutes);

app.get('/api/server', async (req, res) => {
  try {
    await connectToDatabase();
    res.status(200).json({ message: "Connected to MongoDB successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json("server works fine");
});


if (config.nodeENV !== "production") {
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
    connectToDatabase();
  });
}

export default app; 