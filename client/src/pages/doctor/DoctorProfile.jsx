import { useEffect, useState } from "react";

import {
  getDoctorProfile,
  createDoctorProfile,
  updateDoctorProfile,
} from "../../services/doctor.service";

const DoctorProfile = () => {
  const [profileExists, setProfileExists] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] = useState({
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    hospital: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response =
        await getDoctorProfile();

      setFormData({
        specialization:
          response.data.specialization || "",
        qualification:
          response.data.qualification || "",
        experience:
          response.data.experience || "",
        consultationFee:
          response.data.consultationFee || "",
        hospital:
          response.data.hospital || "",
        bio:
          response.data.bio || "",
      });

      setProfileExists(true);
    } catch (error) {
      console.log(
        "Doctor profile not found."
      );

      setProfileExists(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      experience: Number(
        formData.experience
      ),
      consultationFee: Number(
        formData.consultationFee
      ),
    };

    try {
      if (profileExists) {
        await updateDoctorProfile(
          payload
        );

        alert(
          "Profile updated successfully!"
        );
      } else {
        await createDoctorProfile(
          payload
        );

        alert(
          "Profile created successfully!"
        );

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
        Doctor Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="qualification"
          placeholder="Qualification"
          value={formData.qualification}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="consultationFee"
          placeholder="Consultation Fee"
          value={formData.consultationFee}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="hospital"
          placeholder="Hospital"
          value={formData.hospital}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="bio"
          rows="5"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {profileExists
            ? "Update Profile"
            : "Create Profile"}
        </button>

      </form>

    </div>
  );
};

export default DoctorProfile;