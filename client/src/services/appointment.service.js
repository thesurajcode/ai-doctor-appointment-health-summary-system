import api from "../api/axios";

// Book Appointment
export const bookAppointment = async (appointmentData) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );

  return response.data;
};

// Patient Appointments
export const getMyAppointments = async () => {
  const response = await api.get("/appointments/my");

  return response.data;
};

// Doctor completes appointment
export const completeAppointment = async (
  appointmentId,
  notes
) => {
  const response = await api.put(
    `/appointments/${appointmentId}/complete`,
    {
      notes,
    }
  );

  return response.data;
};

// Get complete appointment details
export const getAppointmentDetails = async (
  appointmentId
) => {
  const response = await api.get(
    `/appointments/${appointmentId}`
  );

  return response.data;
};