const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection URI (Ise Vercel Dashboard mein Environment Variable mein daalein)
const MONGO_URI = process.env.MONGO_URI;

// Connection Cache Variable
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  
  const opts = { bufferCommands: false };
  const conn = await mongoose.connect(MONGO_URI, opts);
  cachedDb = conn;
  return conn;
}

// Example Route
app.get('/api/server', async (req, res) => {
  try {
    await connectToDatabase();
    res.status(200).json({ message: "Connected to MongoDB successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Could not connect to database" });
  }
});

app.get('/',(req,res)=>{
  res.json("server works fine");
})

module.exports = app;