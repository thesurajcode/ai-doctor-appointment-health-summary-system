import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PatientLayout from "../layouts/PatientLayout";
import BookAppointment from "../pages/patient/BookAppointment";
import Home from "../pages/shared/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import PatientDashboard from "../pages/patient/PatientDashboard";

import DoctorLayout from "../layouts/DoctorLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

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
      </Route>

    

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
</Route>

    </Routes>
  );
};

export default AppRoutes;