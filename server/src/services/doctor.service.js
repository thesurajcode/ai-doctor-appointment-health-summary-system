const ApiError = require("../errors/ApiError");

const {
  createDoctorProfile,
  getDoctorByUserId,
  getDoctorProfile,
  updateDoctorProfile,
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

const updateMyProfile = async (userId, data) => {

  console.log("========== SERVICE ==========");
  console.log(data);

  const doctor = await getDoctorByUserId(userId);

  if (!doctor) {
    throw new ApiError(404, "Doctor profile not found");
  }

  return updateDoctorProfile(userId, data);
};


module.exports = {
  createProfile,
  getMyProfile,
  updateMyProfile,
};