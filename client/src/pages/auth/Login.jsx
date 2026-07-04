import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  // Loading state
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const response = await login(formData);

      const token = response.data.token;
      const user = response.data.user;

      loginUser(user, token);

      if (user.role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/patient/dashboard");
      }

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">

      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6 md:p-8">

        <Link
          to="/"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Home
        </Link>


        <div className="text-center mt-4 mb-8">

          <h1 className="text-3xl md:text-4xl font-bold">
            🩺 AI Doctor
          </h1>

          <p className="text-sm md:text-base text-gray-500 mt-2">
            Welcome Back
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />


          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />


            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-3 text-sm text-blue-600"
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>

          </div>


          {/* Login Button with loading */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg text-sm md:text-base transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            `}
          >
            {loading
              ? "Signing in..."
              : "Login"}
          </button>


        </form>


        <p className="text-center mt-6 text-sm md:text-base text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>

        </p>


      </div>

    </div>
  );
};

export default Login;