import api from "../api/axios";

export const getDoctorAppointments = async () => {
  const response = await api.get("/appointments/doctor");
  return response.data;
};

export const getAllDoctors = async () => {
  const response = await api.get("/doctor");
  return response.data;
};

export const getDoctorProfile = async () => {
  const response = await api.get("/doctor/profile");
  return response.data;
};

export const createDoctorProfile = async (profileData) => {
  const response = await api.post(
    "/doctor/profile",
    profileData
  );

  return response.data;
};

export const updateDoctorProfile = async (profileData) => {
  const response = await api.put(
    "/doctor/profile",
    profileData
  );

  return response.data;
};