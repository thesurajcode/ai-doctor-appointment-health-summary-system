const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createProfile,
  getMyProfile,
} = require("../services/doctor.service");

const createDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await createProfile(req.user.id, req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      doctor,
      "Doctor profile created successfully"
    )
  );
});

const getDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await getMyProfile(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      doctor,
      "Doctor profile fetched successfully"
    )
  );
});

module.exports = {
  createDoctorProfile,
  getDoctorProfile,
};