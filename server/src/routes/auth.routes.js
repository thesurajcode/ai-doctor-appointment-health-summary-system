const express = require("express");

const {
  register,
  login,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

// Only Doctor Can Access
router.get(
  "/doctor-test",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Doctor",
      user: req.user,
    });
  }
);

// Only Patient Can Access
router.get(
  "/patient-test",
  authMiddleware,
  roleMiddleware("PATIENT"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Patient",
      user: req.user,
    });
  }
);

module.exports = router;