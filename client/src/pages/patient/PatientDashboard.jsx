import { useEffect, useState } from "react";

import DashboardCard from "../../components/patient/DashboardCard";
import AppointmentTable from "../../components/patient/AppointmentTable";
import AISummaryModal from "../../components/doctor/AISummaryModal";

import { getPatientAppointments } from "../../services/patient.service";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showSummaryModal, setShowSummaryModal] =
    useState(false);

  const [selectedSummary, setSelectedSummary] =
    useState("");

  const fetchAppointments = async () => {
    try {
      const response =
        await getPatientAppointments();

      // Backend Response:
      // {
      //   statusCode: 200,
      //   success: true,
      //   message: "...",
      //   data: [...]
      // }

      setAppointments(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch appointments:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleViewSummary = (appointment) => {
    setSelectedSummary(
      appointment.aiSummary ||
        "AI Summary is not available."
    );

    setShowSummaryModal(true);
  };

  const handleCloseSummary = () => {
    setShowSummaryModal(false);
    setSelectedSummary("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  const pendingCount = appointments.filter(
    (appointment) =>
      appointment.status === "PENDING"
  ).length;

  const completedCount = appointments.filter(
    (appointment) =>
      appointment.status === "COMPLETED"
  ).length;

  const totalAppointments =
    appointments.length;

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard Overview
      </h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Total Appointments"
          value={totalAppointments}
          color="bg-blue-200"
        />

        <DashboardCard
          title="Pending"
          value={pendingCount}
          color="bg-yellow-200"
        />

        <DashboardCard
          title="Completed"
          value={completedCount}
          color="bg-green-200"
        />
      </div>

      {/* Appointment History */}
      <AppointmentTable
        appointments={appointments}
        onViewSummary={handleViewSummary}
      />

      {/* AI Summary Modal */}
      {showSummaryModal && (
        <AISummaryModal
          summary={selectedSummary}
          onClose={handleCloseSummary}
        />
      )}
    </>
  );
};

export default PatientDashboard;