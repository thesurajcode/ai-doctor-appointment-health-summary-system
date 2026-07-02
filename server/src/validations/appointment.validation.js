const { z } = require("zod");

const appointmentSchema = z.object({
  doctorId: z.string().min(1),

  appointmentDate: z.string().datetime(),

  appointmentTime: z.string().min(1),

  reason: z.string().min(5).max(500),
});

const appointmentStatusSchema = z.object({
  status: z.enum([
    "CONFIRMED",
    "CANCELLED",
    "COMPLETED",
  ]),
});

const completeAppointmentSchema = z.object({
  notes: z.string().min(10).max(2000),
});

module.exports = {
  appointmentSchema,
  appointmentStatusSchema,
  completeAppointmentSchema,
};