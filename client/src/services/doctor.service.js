import api from "../api/axios";

export const getDoctorAppointments = async () => {
  const response = await api.get("/appointments/doctor");
  return response.data;
};

export const getAllDoctors = async () => {
  const response = await api.get("/doctor");
  return response.data;
};