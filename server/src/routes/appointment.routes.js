const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const {
  appointmentSchema,
  appointmentStatusSchema,
  completeAppointmentSchema,
} = require("../validations/appointment.validation");

const {
  createAppointment,
  getPatientAppointments,
  getDoctorAppointmentList,
  updateStatus,
  completeAppointment,
  getAppointmentDetails,
} = require("../controllers/appointment.controller");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("PATIENT"),
  validate(appointmentSchema),
  createAppointment
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("PATIENT"),
  getPatientAppointments
);

router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  getDoctorAppointmentList
);

router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  validate(appointmentStatusSchema),
  updateStatus
);

router.put(
  "/:id/complete",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  validate(completeAppointmentSchema),
  completeAppointment
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  getAppointmentDetails
);

module.exports = router;