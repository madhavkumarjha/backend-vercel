const express = require('express');
const app = express();
const dotenv = require("dotenv");

dotenv.config();

// Aapke routes
app.get('/api/server', (req, res) => {
  res.send('Hello from Express on Vercel!');
});
app.get('/', (req, res) => {
  res.send(process.env.LINK);
});

// ZAROORI: Express app ko export karein
module.exports = app;