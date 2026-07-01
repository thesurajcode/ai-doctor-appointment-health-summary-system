const { z } = require("zod");

const doctorProfileSchema = z.object({
  specialization: z.string().min(2),
  qualification: z.string().min(2),
  experience: z.number().int().min(0),
  consultationFee: z.number().positive(),
  hospital: z.string().optional(),
  bio: z.string().optional(),
});

module.exports = {
  doctorProfileSchema,
};