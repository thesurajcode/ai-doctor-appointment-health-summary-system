const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const ApiError = require("../errors/ApiError");

const {
  createAppointment,
  getDoctorById,
  getPatientByUserId,
} = require("../repositories/appointment.repository");

const {
  createPayment,
  getPaymentByAppointmentId,
  updatePaymentById,
  confirmAppointmentWithPayment,
} = require("../repositories/payment.repository");

const createPaymentOrder = async (userId, data) => {
  const patient = await getPatientByUserId(userId);
  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }

  const doctor = await getDoctorById(data.doctorId);
  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  const fee = doctor.consultationFee;
  if (!fee || fee <= 0) {
    throw new ApiError(400, "Doctor consultation fee must be greater than 0");
  }

  // Amount in paise for Razorpay
  const amountInPaise = Math.round(fee * 100);

  // Check if real keys are configured
  const keyId = process.env.RAZORPAY_KEY_ID;
  const isMockMode =
    !keyId ||
    keyId.includes("your_key_id") ||
    keyId.includes("placeholder") ||
    keyId === "mock";

  let orderId;

  if (isMockMode) {
    // Generate simulated order ID without needing external Razorpay account
    orderId = `order_sim_${Date.now()}`;
  } else {
    // Create Real Razorpay Order
    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `apt_${Date.now().toString().slice(-8)}`,
    };

    try {
      const order = await razorpay.orders.create(options);
      orderId = order.id;
    } catch (error) {
      console.error("Razorpay order creation error:", error);
      throw new ApiError(
        500,
        error?.error?.description || "Failed to create payment order with Razorpay"
      );
    }
  }

  // Create Appointment with PENDING status
  const appointment = await createAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date(data.appointmentDate),
    appointmentTime: data.appointmentTime,
    reason: data.reason,
  });

  // Create Payment record
  await createPayment({
    appointmentId: appointment.id,
    amount: fee,
    currency: "INR",
    status: "PENDING",
    razorpayOrderId: orderId,
  });

  return {
    orderId: orderId,
    amount: amountInPaise,
    currency: "INR",
    appointmentId: appointment.id,
    keyId: isMockMode ? "mock_mode" : keyId,
    isMock: isMockMode,
  };
};

const verifyPaymentSignature = async (userId, data) => {
  const { appointmentId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
    data;

  const payment = await getPaymentByAppointmentId(appointmentId);
  if (!payment) {
    throw new ApiError(404, "Payment record not found for this appointment");
  }

  const isSimulated =
    razorpayOrderId.startsWith("order_sim_") ||
    razorpaySignature.startsWith("sig_sim_");

  if (!isSimulated) {
    // Verify HMAC-SHA256 signature for real Razorpay
    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpaySignature) {
      await updatePaymentById(payment.id, {
        status: "FAILED",
        razorpayPaymentId,
        razorpaySignature,
      });
      throw new ApiError(400, "Payment verification failed: Invalid signature");
    }
  }

  // Confirm appointment and mark payment as PAID
  const [, updatedAppointment] = await confirmAppointmentWithPayment(
    appointmentId,
    {
      status: "PAID",
      razorpayPaymentId,
      razorpaySignature,
    }
  );

  return {
    appointmentId: updatedAppointment.id,
    status: updatedAppointment.status,
    paymentStatus: "PAID",
  };
};

const getPaymentDetails = async (appointmentId) => {
  const payment = await getPaymentByAppointmentId(appointmentId);
  if (!payment) {
    throw new ApiError(404, "Payment details not found");
  }
  return payment;
};

module.exports = {
  createPaymentOrder,
  verifyPaymentSignature,
  getPaymentDetails,
};
