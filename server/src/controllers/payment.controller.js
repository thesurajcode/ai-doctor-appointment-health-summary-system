const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createPaymentOrder,
  verifyPaymentSignature,
  getPaymentDetails,
} = require("../services/payment.service");

// Create Razorpay Order & Pending Appointment
const createOrder = asyncHandler(async (req, res) => {
  const result = await createPaymentOrder(req.user.id, req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, result, "Payment order created successfully"));
});

// Verify Razorpay Payment Signature & Confirm Appointment
const verifyPayment = asyncHandler(async (req, res) => {
  const result = await verifyPaymentSignature(req.user.id, req.body);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        result,
        "Payment verified and appointment confirmed successfully"
      )
    );
});

// Get Payment Info by Appointment ID
const getPayment = asyncHandler(async (req, res) => {
  const payment = await getPaymentDetails(req.params.appointmentId);

  return res
    .status(200)
    .json(new ApiResponse(200, payment, "Payment details fetched successfully"));
});

module.exports = {
  createOrder,
  verifyPayment,
  getPayment,
};
