import api from "../api/axios";

export const getPatientAppointments = async () => {
  const response = await api.get("/appointments/my");

  return response.data;
};