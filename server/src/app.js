const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("AI Doctor Appointment & Health Summary Backend is Running");
});

const errorHandler = require("./middleware/error.middleware");
//All Routes

app.use("/api/v1/auth", authRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;