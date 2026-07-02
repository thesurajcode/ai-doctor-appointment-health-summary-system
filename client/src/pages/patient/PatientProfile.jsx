import { useEffect, useState } from "react";

import {
  getPatientProfile,
  createPatientProfile,
  updatePatientProfile,
} from "../../services/patient.service";

const PatientProfile = () => {
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    height: "",
    weight: "",
    allergies: "",
    medicalHistory: "",
    emergencyContact: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getPatientProfile();

      setFormData({
        gender: response.data.gender || "",
        dateOfBirth:
          response.data.dateOfBirth?.split("T")[0] || "",
        bloodGroup: response.data.bloodGroup || "",
        height: response.data.height || "",
        weight: response.data.weight || "",
        allergies: response.data.allergies || "",
        medicalHistory:
          response.data.medicalHistory || "",
        emergencyContact:
          response.data.emergencyContact || "",
      });

      setProfileExists(true);
    } catch (error) {
      console.log("Patient profile not found.");
      setProfileExists(false);
    } finally {
      setLoading(false);
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

    const payload = {
  ...formData,

  dateOfBirth: formData.dateOfBirth
    ? new Date(formData.dateOfBirth)
    : null,

  height: formData.height
    ? Number(formData.height)
    : null,

  weight: formData.weight
    ? Number(formData.weight)
    : null,
    };

    try {
      if (profileExists) {
        await updatePatientProfile(payload);

        alert("Profile updated successfully!");
      } else {
        await createPatientProfile(payload);

        alert("Profile created successfully!");

        setProfileExists(true);
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to save profile."
      );
    }
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

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-8">
        Patient Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Gender */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        {/* Date of Birth */}
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {/* Blood Group */}
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Blood Group</option>

          <option value="A_POSITIVE">A+</option>
          <option value="A_NEGATIVE">A-</option>

          <option value="B_POSITIVE">B+</option>
          <option value="B_NEGATIVE">B-</option>

          <option value="AB_POSITIVE">AB+</option>
          <option value="AB_NEGATIVE">AB-</option>

          <option value="O_POSITIVE">O+</option>
          <option value="O_NEGATIVE">O-</option>
        </select>

        {/* Height */}
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {/* Weight */}
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {/* Allergies */}
        <textarea
          name="allergies"
          rows="3"
          placeholder="Allergies"
          value={formData.allergies}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {/* Medical History */}
        <textarea
          name="medicalHistory"
          rows="4"
          placeholder="Medical History"
          value={formData.medicalHistory}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        {/* Emergency Contact */}
        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={formData.emergencyContact}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          {profileExists
            ? "Update Profile"
            : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default PatientProfile;