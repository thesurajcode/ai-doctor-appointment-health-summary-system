const {
  registerUser,
  loginUser,
} = require("../services/auth.service");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      user,
      "User registered successfully"
    )
  );
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        token: result.token,
        user: result.user,
      },
      "Login successful"
    )
  );
});

module.exports = {
  register,
  login,
};