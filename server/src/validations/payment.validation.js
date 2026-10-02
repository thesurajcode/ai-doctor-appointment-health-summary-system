const { z } = require("zod");

const createPaymentOrderSchema = z.object({
  doctorId: z.string().min(1, "Doctor ID is required"),
  appointmentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD"),
  appointmentTime: z.string().min(1, "Appointment time is required"),
  reason: z.string().min(5, "Reason must be at least 5 characters").max(500),
});

const verifyPaymentSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  razorpayOrderId: z.string().min(1, "Razorpay Order ID is required"),
  razorpayPaymentId: z.string().min(1, "Razorpay Payment ID is required"),
  razorpaySignature: z.string().min(1, "Razorpay Signature is required"),
});

module.exports = {
  createPaymentOrderSchema,
  verifyPaymentSchema,
};
