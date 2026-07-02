import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllDoctors } from "../../services/doctor.service";
import { bookAppointment } from "../../services/appointment.service";

const BookAppointment = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await getAllDoctors();

      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await bookAppointment(formData);

      alert("Appointment booked successfully!");

      navigate("/patient/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    }
  };

  
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-6">
        Book Appointment
      </h1>

      <form onSubmit={handleSubmit}>

        <select
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        >
          <option value="">
            Select Doctor
          </option>

          {doctors.map((doctor) => (
            <option
              key={doctor.id}
              value={doctor.id}
            >
              Dr. {doctor.user.name} ({doctor.specialization})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        <input
          type="time"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        <textarea
          name="reason"
          rows="5"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Reason for appointment..."
          className="w-full border rounded-lg p-3 mb-6"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Book Appointment
        </button>

      </form>

    </div>
  );
};

export default BookAppointment;