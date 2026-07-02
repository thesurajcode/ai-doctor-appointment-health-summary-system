import { useState } from "react";

const CompleteAppointmentModal = ({
  appointment,
  onClose,
  onComplete,
}) => {
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onComplete(appointment.id, notes);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[500px]">
        <h2 className="text-2xl font-bold mb-6">
          Complete Appointment
        </h2>

        <form onSubmit={handleSubmit}>
          <textarea
            rows="8"
            placeholder="Enter doctor's notes..."
            className="w-full border rounded-lg p-4"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white"
            >
              Complete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteAppointmentModal;