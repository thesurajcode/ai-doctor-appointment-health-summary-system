const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  createProfile,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
} = require("../services/patient.service");

// Create Patient Profile
const createPatientProfile = asyncHandler(async (req, res) => {
  const patient = await createProfile(
    req.user.id,
    req.body
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      patient,
      "Patient profile created successfully"
    )
  );
});

// Get Logged-in Patient Profile
const getPatientProfile = asyncHandler(async (req, res) => {
  const patient = await getMyProfile(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      patient,
      "Patient profile fetched successfully"
    )
  );
});

// Update Patient Profile
const updatePatient = asyncHandler(async (req, res) => {
  const patient = await updateMyProfile(
    req.user.id,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      patient,
      "Patient profile updated successfully"
    )
  );
});

// Delete Patient Profile
const deletePatient = asyncHandler(async (req, res) => {
  await deleteMyProfile(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Patient profile deleted successfully"
    )
  );
});

module.exports = {
  createPatientProfile,
  getPatientProfile,
  updatePatient,
  deletePatient,
};