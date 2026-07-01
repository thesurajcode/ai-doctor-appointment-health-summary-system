const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits"),

  role: z.enum(["PATIENT", "DOCTOR", "ADMIN"]),
});

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

module.exports = {
  registerSchema,
  loginSchema,
};