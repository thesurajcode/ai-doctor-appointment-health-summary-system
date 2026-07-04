const AppointmentTable = ({
  appointments,
  onViewSummary,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md mt-8 overflow-hidden">

      <h2 className="text-2xl font-bold p-6">
        Appointment History
      </h2>


      {/* Mobile Scroll */}
      <div className="overflow-x-auto">

        <table className="min-w-[700px] w-full border-collapse">

          <thead className="bg-slate-200">

            <tr>
              <th className="p-4 text-left">
                Doctor
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Time
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Action
              </th>
            </tr>

          </thead>


          <tbody>

            {appointments.map((appointment) => (

              <tr
                key={appointment.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-4">
                  {appointment.doctor.user.name}
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

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Completed
                    </span>

                  ) : (

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Pending
                    </span>

                  )}

                </td>


                <td className="p-4">

                  {appointment.status ===
                  "COMPLETED" ? (

                    <button
                      onClick={() =>
                        onViewSummary(appointment)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition whitespace-nowrap"
                    >
                      View Summary
                    </button>

                  ) : (

                    <span className="text-gray-500">
                      Waiting
                    </span>

                  )}

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