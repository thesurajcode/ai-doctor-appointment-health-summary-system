import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">
            🩺 AI Doctor Appointment &
            Health Summary System
          </h1>

          <p className="text-xl max-w-3xl mx-auto mb-10">
            Book appointments with doctors,
            manage patient records and generate
            AI-powered health summaries using
            Gemini AI.
          </p>

          <div className="flex justify-center gap-6">

            <Link
              to="/login"
              className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Register
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-6xl mx-auto py-16 px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-3">
              🤖 AI Health Summary
            </h3>

            <p>
              Doctors can generate AI-powered
              consultation summaries for patients.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-3">
              📅 Appointment Booking
            </h3>

            <p>
              Patients can easily book appointments
              with available doctors.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-3">
              👨‍⚕️ Doctor Dashboard
            </h3>

            <p>
              Doctors can manage appointments,
              complete consultations and generate
              AI summaries.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-3">
              👤 Patient Dashboard
            </h3>

            <p>
              Patients can view appointments,
              profiles and AI-generated reports.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-3">
              🔒 Secure Authentication
            </h3>

            <p>
              JWT Authentication with Role-Based
              Authorization.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-3">
              ⚡ Fast & Responsive
            </h3>

            <p>
              Built using React, Tailwind CSS,
              Express and PostgreSQL.
            </p>
          </div>

        </div>

      </section>

      {/* Tech Stack */}

      <section className="bg-white py-16">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-10">
            Tech Stack
          </h2>

          <div className="flex flex-wrap justify-center gap-4">

            <span className="bg-blue-100 px-5 py-2 rounded-full">
              React
            </span>

            <span className="bg-green-100 px-5 py-2 rounded-full">
              Node.js
            </span>

            <span className="bg-yellow-100 px-5 py-2 rounded-full">
              Express
            </span>

            <span className="bg-purple-100 px-5 py-2 rounded-full">
              PostgreSQL
            </span>

            <span className="bg-pink-100 px-5 py-2 rounded-full">
              Prisma
            </span>

            <span className="bg-red-100 px-5 py-2 rounded-full">
              Flask
            </span>

            <span className="bg-indigo-100 px-5 py-2 rounded-full">
              Gemini AI
            </span>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-slate-900 text-white py-8 text-center">
        <p>
          © 2026 AI Doctor Appointment &
          Health Summary System
        </p>
      </footer>

    </div>
  );
};

export default Home;