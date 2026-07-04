import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllDoctors } from "../../services/doctor.service";
import { bookAppointment } from "../../services/appointment.service";

const BookAppointment = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "doctorId") {
      const doctor = doctors.find(
        (doc) => doc.id === value
      );

      setSelectedDoctor(doctor);
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    setLoading(true);

    await bookAppointment(formData);

    alert("Appointment booked successfully!");

    navigate("/patient/dashboard");

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
        "Booking failed"
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">

      <h1 className="text-3xl font-bold mb-6">
        Book Appointment
      </h1>

      <form onSubmit={handleSubmit}>

        {/* Doctor Dropdown */}

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
              {doctor.user.name} ({doctor.specialization})
            </option>
          ))}
        </select>

        {/* Doctor Details */}

        {selectedDoctor && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">

            <h2 className="text-xl font-bold mb-4">
              Doctor Details
            </h2>

            <div className="space-y-2">

              <p>
                <strong>Name:</strong>{" "}
                {selectedDoctor.user.name}
              </p>

              <p>
                <strong>Specialization:</strong>{" "}
                {selectedDoctor.specialization}
              </p>

              <p>
                <strong>Qualification:</strong>{" "}
                {selectedDoctor.qualification}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {selectedDoctor.experience} Years
              </p>

              <p>
                <strong>Hospital:</strong>{" "}
                {selectedDoctor.hospital || "N/A"}
              </p>

              <p>
                <strong>Consultation Fee:</strong> ₹
                {selectedDoctor.consultationFee}
              </p>

              <p>
                <strong>Bio:</strong>{" "}
                {selectedDoctor.bio || "N/A"}
              </p>

            </div>

          </div>
        )}

        {/* Date */}

        <input
          type="date"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        {/* Time */}

        <input
          type="time"
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-4"
          required
        />

        {/* Reason */}

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
  disabled={loading}
  className={`w-full text-white py-3 rounded-lg transition
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
>
  {
    loading
      ? "Booking Appointment..."
      : "Book Appointment"
  }
</button>

      </form>

    </div>
  );
};

export default BookAppointment;