import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getAppointmentDetails,
  completeAppointment,
  regenerateSummary,
} from "../../services/appointment.service";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const response = await getAppointmentDetails(id);

      setAppointment(response.data);

      if (response.data.notes) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load appointment.");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!notes.trim()) {
      return alert("Please write doctor notes.");
    }

    try {
      setSaving(true);

      await completeAppointment(id, notes);

      alert("Appointment completed successfully.");

      await fetchAppointment();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to complete appointment."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleRegenerate = async () => {
    try {
      setRegenerating(true);
      const response = await regenerateSummary(id);
      alert("AI Summary generated successfully!");
      setAppointment(response.data);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to generate AI summary."
      );
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Heading */}

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Appointment Details
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Back
        </button>
      </div>

      {/* Patient Information */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-semibold mb-6">
          👤 Patient Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <p>
            <strong>Name:</strong>{" "}
            {appointment.patient.user.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {appointment.patient.user.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {appointment.patient.user.phone}
          </p>

          <p>
            <strong>Gender:</strong>{" "}
            {appointment.patient.gender || "Not Available"}
          </p>

          <p>
            <strong>Blood Group:</strong>{" "}
            {appointment.patient.bloodGroup || "Not Available"}
          </p>

          <p>
            <strong>Height:</strong>{" "}
            {appointment.patient.height || "Not Available"} cm
          </p>

          <p>
            <strong>Weight:</strong>{" "}
            {appointment.patient.weight || "Not Available"} kg
          </p>

          <p>
            <strong>Emergency Contact:</strong>{" "}
            {appointment.patient.emergencyContact ||
              "Not Available"}
          </p>

        </div>

        <div className="mt-6">

          <h3 className="font-semibold">
            Allergies
          </h3>

          <p className="text-gray-700 mt-2">
            {appointment.patient.allergies ||
              "Not Mentioned"}
          </p>

        </div>

        <div className="mt-6">

          <h3 className="font-semibold">
            Medical History
          </h3>

          <p className="text-gray-700 mt-2">
            {appointment.patient.medicalHistory ||
              "Not Mentioned"}
          </p>

        </div>

      </div>

      {/* Appointment Information */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-semibold mb-6">
          📅 Appointment Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <p>
            <strong>Doctor:</strong> Dr.{" "}
            {appointment.doctor.user.name}
          </p>

          <p>
            <strong>Specialization:</strong>{" "}
            {appointment.doctor.specialization}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              appointment.appointmentDate
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong>{" "}
            {appointment.appointmentTime}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{appointment.status.toLowerCase()}</span>
          </p>

          <p>
            <strong>Payment:</strong>{" "}
            {appointment.payment?.status === "PAID" ? (
              <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                ✓ ₹{appointment.payment.amount} Paid
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                Pending
              </span>
            )}
          </p>
        </div>

        <div className="mt-6">

          <h3 className="font-semibold">
            Reason For Visit
          </h3>

          <p className="text-gray-700 mt-2">
            {appointment.reason}
          </p>

        </div>

      </div>

      {/* Consultation */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-semibold mb-6">
          🩺 Doctor Consultation
        </h2>

        <textarea
          rows={8}
          value={notes}
          disabled={
            appointment.status === "COMPLETED"
          }
          onChange={(e) =>
            setNotes(e.target.value)
          }
          placeholder="Write consultation notes..."
          className="w-full border rounded-lg p-4"
        />

        {appointment.status !== "COMPLETED" && (
          <button
            onClick={handleComplete}
            disabled={saving}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {saving
              ? "Completing..."
              : "Complete Appointment"}
          </button>
        )}

      </div>

      {/* AI Summary Section */}
      {appointment.status === "COMPLETED" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 border-b border-green-200/60 pb-3">
            <h2 className="text-2xl font-semibold text-green-900">
              🤖 AI Health Summary
            </h2>
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm flex items-center gap-2 text-white ${
                regenerating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
              }`}
            >
              {regenerating ? "⚡ Generating with Gemini..." : "🔄 Regenerate Summary"}
            </button>
          </div>

          <div className="whitespace-pre-wrap leading-8 text-gray-800">
            {appointment.aiSummary ||
              "AI summary has not been generated yet. Click 'Regenerate Summary' above."}
          </div>
        </div>
      )}

    </div>
  );
};

export default AppointmentDetails;