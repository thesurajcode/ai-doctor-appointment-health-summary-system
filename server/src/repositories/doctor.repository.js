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


const updateDoctorProfile = async (userId, doctorData) => {

  console.log("========== REPOSITORY ==========");
  console.log(doctorData);

  return prisma.doctor.update({
    where: {
      userId,
    },
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

const deleteDoctorProfile = async (userId) => {
  return prisma.doctor.delete({
    where: {
      userId,
    },
  });
};

const getAllDoctors = async () => {
  return prisma.doctor.findMany({
    where: {
      available: true,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getDoctorById = async (doctorId) => {
  return prisma.doctor.findUnique({
    where: {
      id: doctorId,
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
  updateDoctorProfile,
  deleteDoctorProfile,
  getAllDoctors,
  getDoctorById,
};