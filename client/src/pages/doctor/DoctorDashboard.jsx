import { useEffect, useState } from "react";

import DashboardCard from "../../components/doctor/DashboardCard";
import AppointmentTable from "../../components/doctor/AppointmentTable";
import CompleteAppointmentModal from "../../components/doctor/CompleteAppointmentModal";
import AISummaryModal from "../../components/doctor/AISummaryModal";

import { getDoctorAppointments } from "../../services/doctor.service";
import { completeAppointment } from "../../services/appointment.service";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // AI Summary Modal
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState("");

  const fetchAppointments = async () => {
    try {
      const response = await getDoctorAppointments();

      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Open Complete Appointment Modal
  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  // Close Complete Appointment Modal
  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setShowModal(false);
  };

  // Complete Appointment
  const handleCompleteAppointment = async (
    appointmentId,
    notes
  ) => {
    try {
      await completeAppointment(appointmentId, notes);

      alert("Appointment completed successfully.");

      handleCloseModal();

      fetchAppointments();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to complete appointment."
      );
    }
  };

  // Open AI Summary Modal
  const handleViewSummary = (appointment) => {
    setSelectedSummary(
      appointment.aiSummary ||
        "AI Summary is not available."
    );

    setShowSummaryModal(true);
  };

  // Close AI Summary Modal
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
    (appointment) => appointment.status === "PENDING"
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "COMPLETED"
  ).length;

  const totalAppointments = appointments.length;

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

      {/* Appointment Table */}
      <AppointmentTable
        appointments={appointments}
        onComplete={handleOpenModal}
        onViewSummary={handleViewSummary}
      />

      {/* Complete Appointment Modal */}
      {showModal && (
        <CompleteAppointmentModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onComplete={handleCompleteAppointment}
        />
      )}

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

export default DoctorDashboard;