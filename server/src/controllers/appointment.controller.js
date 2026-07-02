const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  changeAppointmentStatus,
  completeMyAppointment,
} = require("../services/appointment.service");

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

module.exports = {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointmentList,
  updateStatus,
  completeAppointment,
};