const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  changeAppointmentStatus,
  completeMyAppointment,
  getAppointmentDetails: getAppointmentDetailsService,
} = require("../services/appointment.service");

// Book Appointment
const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await bookAppointment(
    req.user.id,
    req.body
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      appointment,
      "Appointment booked successfully"
    )
  );
});

// Patient Appointments
const getPatientAppointments = asyncHandler(async (req, res) => {
  const appointments = await getMyAppointments(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      appointments,
      "Appointments fetched successfully"
    )
  );
});

// Doctor Appointments
const getDoctorAppointmentList = asyncHandler(async (req, res) => {
  const appointments = await getDoctorAppointments(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      appointments,
      "Doctor appointments fetched successfully"
    )
  );
});

// Update Status
const updateStatus = asyncHandler(async (req, res) => {
  const appointment = await changeAppointmentStatus(
    req.params.id,
    req.body.status
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      appointment,
      "Appointment status updated successfully"
    )
  );
});

// Complete Appointment
const completeAppointment = asyncHandler(async (req, res) => {
  const appointment = await completeMyAppointment(
    req.params.id,
    req.body.notes
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      appointment,
      "Appointment completed successfully"
    )
  );
});

// Get Appointment Details
const getAppointmentDetails = asyncHandler(async (req, res) => {
  console.log("Appointment ID:", req.params.id);

  const appointment =
    await getAppointmentDetailsService(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      appointment,
      "Appointment details fetched successfully"
    )
  );
});

module.exports = {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointmentList,
  updateStatus,
  completeAppointment,
  getAppointmentDetails,
};