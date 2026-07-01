const ApiError = require("../errors/ApiError");

const {
  createDoctorProfile,
  getDoctorByUserId,
  getDoctorProfile,
} = require("../repositories/doctor.repository");




const createProfile = async (userId, data) => {
  const existingDoctor = await getDoctorByUserId(userId);

  if (existingDoctor) {
    throw new ApiError(400, "Doctor profile already exists");
  }

  return createDoctorProfile({
    userId,
    ...data,
  });
};

const getMyProfile = async (userId) => {
  const doctor = await getDoctorProfile(userId);

  if (!doctor) {
    throw new ApiError(404, "Doctor profile not found");
  }

  return doctor;
};

module.exports = {
  createProfile,
  getMyProfile,
};