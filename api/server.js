import express from 'express';
import connectToDatabase from '../config/connectDB.js';
import config from '../config/config.js';

const app = express();
app.use(express.json());

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