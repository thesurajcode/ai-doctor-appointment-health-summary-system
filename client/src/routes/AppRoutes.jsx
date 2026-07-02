import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/shared/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import PatientDashboard from "../pages/patient/PatientDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

  <Route
  path="/doctor/dashboard"
  element={
    <ProtectedRoute allowedRole="DOCTOR">
      <DoctorDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/patient/dashboard"
  element={
    <ProtectedRoute allowedRole="PATIENT">
      <PatientDashboard />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRoutes;