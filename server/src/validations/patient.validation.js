const { z } = require("zod");

const patientProfileSchema = z.object({
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),

  dateOfBirth: z.string().optional(),

  bloodGroup: z.enum([
    "A_POSITIVE",
    "A_NEGATIVE",
    "B_POSITIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE",
  ]).optional(),

  height: z.number().positive().optional(),

  weight: z.number().positive().optional(),

  allergies: z.string().optional(),

  medicalHistory: z.string().optional(),

  emergencyContact: z.string().optional(),
});

module.exports = {
  patientProfileSchema,
};