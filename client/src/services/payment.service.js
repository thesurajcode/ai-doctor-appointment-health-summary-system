import api from "../api/axios";

// Create Razorpay Order
export const createPaymentOrder = async (bookingData) => {
  const response = await api.post("/payments/create-order", bookingData);
  return response.data;
};

// Verify Payment Signature
export const verifyPayment = async (verificationData) => {
  const response = await api.post("/payments/verify", verificationData);
  return response.data;
};

// Get Payment Details
export const getPaymentDetails = async (appointmentId) => {
  const response = await api.get(`/payments/${appointmentId}`);
  return response.data;
};
