const express = require('express');
const app = express();

// Aapke routes
app.get('/api/server', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// ZAROORI: Express app ko export karein
module.exports = app;