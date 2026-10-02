import { useState } from "react";

const PaymentModal = ({
  isOpen,
  onClose,
  orderData,
  doctorName,
  consultationFee,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !orderData) return null;

  const handleSimulatePayment = async () => {
    setProcessing(true);
    try {
      // Simulate realistic payment delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      await onPaymentSuccess({
        appointmentId: orderData.appointmentId,
        razorpay_order_id: orderData.orderId,
        razorpay_payment_id: `pay_sim_${Date.now()}`,
        razorpay_signature: "sig_sim_valid",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-blue-600 text-white p-5">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xs bg-blue-500/80 px-2 py-0.5 rounded text-blue-100 uppercase tracking-wider font-semibold">
                Test Mode Simulation
              </span>
              <h3 className="text-lg font-bold mt-1">AI Healthcare Checkout</h3>
            </div>
            <button
              onClick={onClose}
              disabled={processing}
              className="text-white/80 hover:text-white text-2xl font-light leading-none"
            >
              ✕
            </button>
          </div>
          <div className="mt-3 flex justify-between items-baseline border-t border-blue-500/50 pt-3">
            <span className="text-sm text-blue-100">Consultation with {doctorName}</span>
            <span className="text-2xl font-bold">₹{consultationFee}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-gray-500">
            Select a payment method to simulate the checkout transaction without needing external bank credentials:
          </p>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSelectedMethod("upi")}
              className={`p-3 rounded-xl border text-left transition ${
                selectedMethod === "upi"
                  ? "border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-sm"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <div className="text-sm">📱 UPI / QR</div>
              <div className="text-[11px] text-gray-500 mt-0.5">GPay, PhonePe, Paytm</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod("card")}
              className={`p-3 rounded-xl border text-left transition ${
                selectedMethod === "card"
                  ? "border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-sm"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <div className="text-sm">💳 Debit / Credit</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Visa, Mastercard, RuPay</div>
            </button>
          </div>

          {/* Selected Method Details */}
          {selectedMethod === "upi" ? (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-gray-600 space-y-1">
              <div className="font-medium text-gray-800">Simulated UPI ID:</div>
              <div className="font-mono bg-white p-2 rounded border border-slate-200 text-blue-700">
                patient@upi.simulation
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-gray-600 space-y-1">
              <div className="font-medium text-gray-800">Simulated Test Card:</div>
              <div className="font-mono bg-white p-2 rounded border border-slate-200 text-blue-700">
                •••• •••• •••• 4242 &bull; Exp: 12/28
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              disabled={processing}
              onClick={handleSimulatePayment}
              className={`w-full py-3 rounded-xl text-white font-semibold shadow-md transition flex items-center justify-center gap-2 ${
                processing
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99]"
              }`}
            >
              {processing ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <span>Processing Payment...</span>
                </>
              ) : (
                `Simulate Pay ₹${consultationFee} & Confirm`
              )}
            </button>

            <button
              type="button"
              disabled={processing}
              onClick={onClose}
              className="w-full py-2.5 text-sm text-gray-600 hover:text-gray-900 transition font-medium"
            >
              Cancel Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
