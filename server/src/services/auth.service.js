const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../errors/ApiError");

const {
  findUserByEmail,
  createUser,
} = require("../repositories/user.repository");

const registerUser = async (userData) => {
  const { name, email, password, phone, role } = userData;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    phone,
    role,
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(409, "Email already exists");
  } 

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Remove password before sending response
  const { password: _, ...userWithoutPassword } = user;

  return {
    token,
    user: userWithoutPassword,
  };
};

module.exports = {
  registerUser,
  loginUser,
};