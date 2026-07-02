import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/shared/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import DoctorLayout from "../layouts/DoctorLayout";
import PatientLayout from "../layouts/PatientLayout";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import DoctorProfile from "../pages/doctor/DoctorProfile";

import PatientDashboard from "../pages/patient/PatientDashboard";
import PatientProfile from "../pages/patient/PatientProfile";
import BookAppointment from "../pages/patient/BookAppointment";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRole="DOCTOR">
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<DoctorDashboard />}
        />

        <Route
          path="profile"
          element={<DoctorProfile />}
        />
      </Route>

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRole="PATIENT">
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<PatientDashboard />}
        />

        <Route
          path="book-appointment"
          element={<BookAppointment />}
        />

        <Route
          path="profile"
          element={<PatientProfile />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;