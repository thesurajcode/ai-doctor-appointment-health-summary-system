import api from "../api/axios";

export const getPatientAppointments = async () => {
  const response = await api.get("/appointments/my");
  return response.data;
};

export const getPatientProfile = async () => {
  const response = await api.get("/patient/profile");
  return response.data;
};

export const createPatientProfile = async (profileData) => {
  const response = await api.post(
    "/patient/profile",
    profileData
  );

  return response.data;
};

export const updatePatientProfile = async (profileData) => {
  const response = await api.put(
    "/patient/profile",
    profileData
  );

  return response.data;
};

export const deletePatientProfile = async () => {
  const response = await api.delete("/patient/profile");
  return response.data;
};




