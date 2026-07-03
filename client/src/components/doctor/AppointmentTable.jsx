const AppointmentTable = ({
  appointments,
  onComplete,
  onViewSummary,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md mt-8 overflow-hidden">
      <h2 className="text-2xl font-bold p-6">
        Appointments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead className="bg-slate-200">
            <tr>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-4 font-medium">
                  {appointment.patient.user.name}
                </td>

                <td className="p-4">
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {appointment.appointmentTime}
                </td>

                <td className="p-4">
                  {appointment.status === "COMPLETED" ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                      Pending
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex flex-wrap gap-2">

                    {/* View Details */}
                    <button
                      onClick={() =>
                        onViewDetails(appointment)
                      }
                      className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
                    >
                      View Details
                    </button>

                    {/* Complete Appointment */}
                    {appointment.status === "PENDING" && (
                      <button
                        onClick={() =>
                          onComplete(appointment)
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Complete
                      </button>
                    )}

                    {/* View AI Summary */}
                    {appointment.status === "COMPLETED" && (
                      <button
                        onClick={() =>
                          onViewSummary(appointment)
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        View Summary
                      </button>
                    )}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;