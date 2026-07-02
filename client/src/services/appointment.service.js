import api from "../api/axios";

// Book a new appointment
export const bookAppointment = async (
  appointmentData
) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );

  return response.data;
};

// Complete an appointment
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