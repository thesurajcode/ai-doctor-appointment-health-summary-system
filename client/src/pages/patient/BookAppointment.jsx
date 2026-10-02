import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllDoctors } from "../../services/doctor.service";
import {
  createPaymentOrder,
  verifyPayment,
} from "../../services/payment.service";
import PaymentModal from "../../components/patient/PaymentModal";

const BookAppointment = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeOrderData, setActiveOrderData] = useState(null);

  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await getAllDoctors();

      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "doctorId") {
      const doctor = doctors.find((doc) => doc.id === value);

      setSelectedDoctor(doctor);
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      setLoading(true);
      await verifyPayment({
        appointmentId: paymentData.appointmentId,
        razorpayOrderId: paymentData.razorpay_order_id,
        razorpayPaymentId: paymentData.razorpay_payment_id,
        razorpaySignature: paymentData.razorpay_signature,
      });

      setShowPaymentModal(false);
      alert("Payment successful! Your appointment is confirmed.");
      navigate("/patient/dashboard");
    } catch (verifyError) {
      console.error("Payment verification error:", verifyError);
      alert(
        verifyError.response?.data?.message ||
          "Payment verification failed. Please contact support."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoctor) {
      alert("Please select a doctor");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Order on Backend
      const orderRes = await createPaymentOrder({
        doctorId: formData.doctorId,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        reason: formData.reason,
      });

      const { orderId, amount, currency, appointmentId, keyId, isMock } =
        orderRes.data;

      // If in Mock / Simulator mode, open the test payment modal
      if (isMock || keyId === "mock_mode") {
        setActiveOrderData({
          orderId,
          amount,
          currency,
          appointmentId,
        });
        setShowPaymentModal(true);
        setLoading(false);
        return;
      }

      // If real Razorpay keys are provided, open Razorpay Checkout SDK
      if (!window.Razorpay) {
        alert(
          "Razorpay SDK is loading or unavailable. Please check your connection."
        );
        setLoading(false);
        return;
      }

      const options = {
        key: keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency || "INR",
        name: "AI Doctor Healthcare",
        description: `Consultation with Dr. ${selectedDoctor.user?.name || "Doctor"}`,
        order_id: orderId,
        handler: async function (response) {
          await handlePaymentSuccess({
            appointmentId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
        },
        theme: {
          color: "#2563EB",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert(
        error.response?.data?.message ||
          "Could not initiate booking and payment"
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-6">
        Book Appointment
      </h1>

      <form onSubmit={handleSubmit}>

        {/* Doctor Dropdown */}

        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        >
          <option value="">
            Select Doctor
          </option>

          {doctors.map((doctor) => (
            <option
              key={doctor.id}
              value={doctor.id}
            >
              {doctor.user.name} ({doctor.specialization})
            </option>
          ))}
        </select>

        {/* Doctor Details */}

        {selectedDoctor && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">

            <h2 className="text-xl font-bold mb-4">
              Doctor Details
            </h2>

            <div className="space-y-2">

              <p>
                <strong>Name:</strong>{" "}
                {selectedDoctor.user.name}
              </p>

              <p>
                <strong>Specialization:</strong>{" "}
                {selectedDoctor.specialization}
              </p>

              <p>
                <strong>Qualification:</strong>{" "}
                {selectedDoctor.qualification}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {selectedDoctor.experience} Years
              </p>

              <p>
                <strong>Hospital:</strong>{" "}
                {selectedDoctor.hospital || "N/A"}
              </p>

              <p>
                <strong>Consultation Fee:</strong> ₹
                {selectedDoctor.consultationFee}
              </p>

              <p>
                <strong>Bio:</strong>{" "}
                {selectedDoctor.bio || "N/A"}
              </p>

            </div>

          </div>
        )}

        {/* Date */}

        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        {/* Time */}

        <input
          type="time"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        {/* Reason */}

        <textarea
          name="reason"
          rows="5"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Reason for appointment..."
          className="w-full border rounded-lg p-3 mb-6"
          required
        />

<button
  type="submit"
  disabled={loading}
  className={`w-full text-white font-medium py-3 rounded-lg transition shadow
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 active:scale-[0.99]"
    }
  `}
>
  {loading
    ? "Processing Payment..."
    : selectedDoctor
    ? `💳 Pay ₹${selectedDoctor.consultationFee} & Book Appointment`
    : "Select a Doctor to Proceed"}
</button>

      </form>

      {/* Test Mode Payment Simulator Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        orderData={activeOrderData}
        doctorName={selectedDoctor?.user?.name || "Doctor"}
        consultationFee={selectedDoctor?.consultationFee || 0}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default BookAppointment;