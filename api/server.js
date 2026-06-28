const express = require("express");
const app = express();

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello Madhav, backend is working!" });
});

// Export as serverless function
module.exports = app;
