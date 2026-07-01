const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");

const {
  doctorProfileSchema,
} = require("../validations/doctor.validation");

const {
  createDoctorProfile,
  getDoctorProfile,
  updateDoctor,
} = require("../controllers/doctor.controller");

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  getDoctorProfile
);

router.post(
  "/profile",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  validate(doctorProfileSchema),
  createDoctorProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  validate(doctorProfileSchema),
  updateDoctor
);

module.exports = router;