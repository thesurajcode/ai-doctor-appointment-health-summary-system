import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/auth.service";


const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "PATIENT",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(formData);

      alert("Registration Successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
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

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-sm md:text-base text-gray-500 mb-8">
          Register to AI Doctor
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="PATIENT">
              Patient
            </option>

            <option value="DOCTOR">
              Doctor
            </option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm md:text-base hover:bg-blue-700 transition"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-6 text-sm md:text-base text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;