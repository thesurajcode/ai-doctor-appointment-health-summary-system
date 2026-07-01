const express = require("express");
const cors = require("cors");

console.log("✅ app.js loaded");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Root Route Working");
});

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "Health Route Working"
  });
});

module.exports = app;