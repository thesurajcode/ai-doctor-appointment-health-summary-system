const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const {
  patientProfileSchema,
} = require("../validations/patient.validation");

const {
  createPatientProfile,
  getPatientProfile,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");


router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("PATIENT"),
  validate(patientProfileSchema),
  createPatientProfile
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("PATIENT"),
  getPatientProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("PATIENT"),
  validate(patientProfileSchema),
  updatePatient
);

router.delete(
  "/profile",
  authMiddleware,
  roleMiddleware("PATIENT"),
  deletePatient
);
module.exports = router;