const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const {
  createPaymentOrderSchema,
  verifyPaymentSchema,
} = require("../validations/payment.validation");

const {
  createOrder,
  verifyPayment,
  getPayment,
} = require("../controllers/payment.controller");

const router = express.Router();

// Create Razorpay Order & Initialize Booking
router.post(
  "/create-order",
  authMiddleware,
  roleMiddleware("PATIENT"),
  validate(createPaymentOrderSchema),
  createOrder
);

// Verify Signature & Confirm Appointment
router.post(
  "/verify",
  authMiddleware,
  roleMiddleware("PATIENT"),
  validate(verifyPaymentSchema),
  verifyPayment
);

// Get Payment Details for Appointment
router.get("/:appointmentId", authMiddleware, getPayment);

module.exports = router;
