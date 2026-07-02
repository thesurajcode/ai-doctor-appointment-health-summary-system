const prisma = require("../config/prisma");

const createAppointment = async (appointmentData) => {
  return prisma.appointment.create({
    data: appointmentData,
    include: {
      doctor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
      patient: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
  });
};

const getDoctorById = async (doctorId) => {
  return prisma.doctor.findUnique({
    where: {
      id: doctorId,
    },
  });
};

const getPatientByUserId = async (userId) => {
  return prisma.patient.findUnique({
    where: {
      userId,
    },
  });
};

const getAppointmentByDoctorDateTime = async (
  doctorId,
  appointmentDate,
  appointmentTime
) => {
  return prisma.appointment.findFirst({
    where: {
      doctorId,
      appointmentDate,
      appointmentTime,
      status: {
        not: "CANCELLED",
      },
    },
  });
};

const getAppointmentsByPatientId = async (patientId) => {
  return prisma.appointment.findMany({
    where: {
      patientId,
    },
    include: {
      doctor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
    orderBy: {
      appointmentDate: "asc",
    },
  });
};

const getMyAppointments = async (userId) => {
  const patient = await getPatientByUserId(userId);

  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }

  return await getAppointmentsByPatientId(patient.id);
};


const getAppointmentsByDoctorId = async (doctorId) => {
  return prisma.appointment.findMany({
    where: {
      doctorId,
    },
    include: {
      patient: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
    orderBy: {
      appointmentDate: "asc",
    },
  });
};

const getAppointmentById = async (appointmentId) => {
  return prisma.appointment.findUnique({
    where: {
      id: appointmentId,
    },
  });
};

const updateAppointmentStatus = async (
  appointmentId,
  status
) => {
  return prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status,
    },
    include: {
      doctor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      patient: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
};

const completeAppointment = async (
  appointmentId,
  notes
) => {
  return prisma.appointment.update({
    where: {
      id: appointmentId,
    },
    data: {
      status: "COMPLETED",
      notes,
    },
    include: {
      doctor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
      patient: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
  });
};


module.exports = {
  createAppointment,
  getDoctorById,
  getPatientByUserId,
  getAppointmentByDoctorDateTime,
  getAppointmentsByPatientId,
  getAppointmentsByDoctorId,
  getAppointmentById,
  updateAppointmentStatus,
  completeAppointment,
};