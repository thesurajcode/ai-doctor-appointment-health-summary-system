const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");
const ApiError = require("../errors/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access token is missing");
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid or expired token");
  }

  // Remove password before attaching user to request
  const { password, ...userWithoutPassword } = user;

  req.user = userWithoutPassword;

  next();
});

module.exports = authMiddleware;