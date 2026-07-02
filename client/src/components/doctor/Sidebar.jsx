import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-blue-700 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        🏥 AI Doctor
      </h1>

      <nav className="flex flex-col gap-4">
        <Link to="/doctor/dashboard">Dashboard</Link>

        <Link to="/doctor/appointments">
          Appointments
        </Link>

        <Link to="/doctor/profile">
          Profile
        </Link>

        <button className="text-left">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;