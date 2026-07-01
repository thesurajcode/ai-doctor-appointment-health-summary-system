const prisma = require("../config/prisma");

const createPatientProfile = async (patientData) => {
  return prisma.patient.create({
    data: patientData,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImage: true,
          role: true,
        },
      },
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

const getPatientProfile = async (userId) => {
  return prisma.patient.findUnique({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImage: true,
          role: true,
        },
      },
    },
  });
};

const updatePatientProfile = async (userId, patientData) => {
  return prisma.patient.update({
    where: {
      userId,
    },
    data: patientData,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImage: true,
          role: true,
        },
      },
    },
  });
};

const deletePatientProfile = async (userId) => {
  return prisma.patient.delete({
    where: {
      userId,
    },
  });
};

module.exports = {
  createPatientProfile,
  getPatientByUserId,
  getPatientProfile,
  updatePatientProfile,
  deletePatientProfile,
};