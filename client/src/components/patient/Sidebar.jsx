import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        🩺 AI Doctor
      </h1>

      <nav className="flex flex-col gap-4">

        <NavLink
          to="/patient/dashboard"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/patient/book-appointment"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          Book Appointment
        </NavLink>

        <NavLink
          to="/patient/profile"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          Profile
        </NavLink>

      </nav>
    </aside>
  );
};

export default Sidebar;