import { useState } from "react";

const CompleteAppointmentModal = ({
  appointment,
  onClose,
  onComplete,
  loading,
}) => {
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onComplete(appointment.id, notes);
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">

      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">
          Complete Appointment
        </h2>


        <form onSubmit={handleSubmit}>

          <textarea
            rows="8"
            placeholder="Enter doctor's notes..."
            className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            disabled={loading}
          />


          <div className="flex justify-end gap-4 mt-6">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 rounded-lg border disabled:opacity-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              {
                loading
                  ? "Generating AI Summary..."
                  : "Complete"
              }
            </button>


          </div>

        </form>

      </div>

    </div>
  );
};

export default CompleteAppointmentModal;