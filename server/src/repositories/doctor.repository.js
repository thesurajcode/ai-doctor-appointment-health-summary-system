const prisma = require("../config/prisma");

const createDoctorProfile = async (doctorData) => {
  return prisma.doctor.create({
    data: doctorData,
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

const getDoctorByUserId = async (userId) => {
  return prisma.doctor.findUnique({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });
};

const getDoctorProfile = async (userId) => {
  return prisma.doctor.findUnique({
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


module.exports = {
  createDoctorProfile,
  getDoctorByUserId,
  getDoctorProfile,
};