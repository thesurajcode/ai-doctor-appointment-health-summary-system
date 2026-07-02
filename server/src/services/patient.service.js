const ApiError = require("../errors/ApiError");


const {
  createPatientProfile,
  getPatientByUserId,
  getPatientProfile,
  updatePatientProfile,
  deletePatientProfile,
} = require("../repositories/patient.repository");

const createProfile = async (userId, data) => {
  const existingPatient = await getPatientByUserId(userId);

  if (existingPatient) {
    throw new ApiError(400, "Patient profile already exists");
  }

  return createPatientProfile({
    userId,
    ...data,
  });
};

const getMyProfile = async (userId) => {
  const patient = await getPatientProfile(userId);

  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }

  return patient;
};

const updateMyProfile = async (userId, data) => {
  const patient = await getPatientByUserId(userId);

  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }

  return updatePatientProfile(userId, data);
};

const deleteMyProfile = async (userId) => {
  const patient = await getPatientByUserId(userId);

  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }

  await deletePatientProfile(userId);

  return;
};



module.exports = {
  createProfile,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
};