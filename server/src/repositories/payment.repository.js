const prisma = require("../config/prisma");

const createPayment = async (paymentData) => {
  return prisma.payment.create({
    data: paymentData,
  });
};

const getPaymentByAppointmentId = async (appointmentId) => {
  return prisma.payment.findUnique({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          doctor: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const getPaymentByOrderId = async (razorpayOrderId) => {
  return prisma.payment.findFirst({
    where: {
      razorpayOrderId,
    },
  });
};

const updatePaymentById = async (id, data) => {
  return prisma.payment.update({
    where: { id },
    data,
  });
};

const confirmAppointmentWithPayment = async (
  appointmentId,
  paymentUpdateData
) => {
  return prisma.$transaction([
    prisma.payment.update({
      where: { appointmentId },
      data: paymentUpdateData,
    }),
    prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "CONFIRMED" },
    }),
  ]);
};

module.exports = {
  createPayment,
  getPaymentByAppointmentId,
  getPaymentByOrderId,
  updatePaymentById,
  confirmAppointmentWithPayment,
};
