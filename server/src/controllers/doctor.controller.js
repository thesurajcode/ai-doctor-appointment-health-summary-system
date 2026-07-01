const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createProfile,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  getDoctors,
  getDoctor,
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

const updateDoctor = asyncHandler(async (req, res) => {
  console.log("========== CONTROLLER ==========");
  console.log(req.body);
  console.log(req.validatedData);

  const doctor = await updateMyProfile(
    req.user.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      doctor,
      "Doctor profile updated successfully"
    )
  );
});

const deleteDoctor = asyncHandler(async (req, res) => {
  await deleteMyProfile(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Doctor profile deleted successfully"
    )
  );
});

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await getDoctors();

  return res.status(200).json(
    new ApiResponse(
      200,
      doctors,
      "Doctors fetched successfully"
    )
  );
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await getDoctor(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      doctor,
      "Doctor fetched successfully"
    )
  );
});

module.exports = {
  createDoctorProfile,
  getDoctorProfile,
  updateDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
};