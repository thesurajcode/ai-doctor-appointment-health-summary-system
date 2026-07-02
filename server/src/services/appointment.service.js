const ApiError = require("../errors/ApiError");
;

const {
  createAppointment,
  getDoctorById,
  getPatientByUserId,
  getAppointmentByDoctorDateTime,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  getAppointmentById,
  updateAppointmentStatus,
  completeAppointment,
} = require("../repositories/appointment.repository");

const {
  getDoctorByUserId,
} = require("../repositories/doctor.repository");

const bookAppointment = async (userId, data) => {
  const patient = await getPatientByUserId(userId);

  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }

  const doctor = await getDoctorById(data.doctorId);

  if (!doctor) {
    throw new ApiError(404, "Doctor not found");
  }

  return createAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date(data.appointmentDate),
    appointmentTime: data.appointmentTime,
    reason: data.reason,
  });
};

const getMyAppointments = async (userId) => {
  const patient = await getPatientByUserId(userId);

  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }

  return await getAppointmentsByPatientId(patient.id);
};

const getDoctorAppointments = async (userId) => {
  const doctor = await getDoctorByUserId(userId);

  if (!doctor) {
    throw new ApiError(404, "Doctor profile not found");
  }

  return await getAppointmentsByDoctorId(doctor.id);
};

const changeAppointmentStatus = async (
  appointmentId,
  status
) => {
  const appointment = await getAppointmentById(
    appointmentId
  );

  if (!appointment) {
    throw new ApiError(
      404,
      "Appointment not found"
    );
  }

  if (appointment.status === "COMPLETED") {
    throw new ApiError(
      400,
      "Completed appointment cannot be updated"
    );
  }

  return await updateAppointmentStatus(
    appointmentId,
    status
  );
};

const completeMyAppointment = async (
  appointmentId,
  notes
) => {
  const appointment = await getAppointmentById(
    appointmentId
  );

  if (!appointment) {
    throw new ApiError(
      404,
      "Appointment not found"
    );
  }

  if (appointment.status === "COMPLETED") {
    throw new ApiError(
      400,
      "Appointment is already completed"
    );
  }

  return await completeAppointment(
    appointmentId,
    notes
  );
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  changeAppointmentStatus,
  completeMyAppointment,
};