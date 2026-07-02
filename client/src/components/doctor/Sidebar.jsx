import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-blue-700 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-10">
        🩺 AI Doctor
      </h1>

      <nav className="flex flex-col gap-3 flex-1">

        <NavLink
          to="/doctor/dashboard"
          className={({ isActive }) =>
            `p-3 rounded transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/doctor/profile"
          className={({ isActive }) =>
            `p-3 rounded transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          Profile
        </NavLink>

      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-red-600 hover:bg-red-700 transition rounded-lg py-3 font-semibold"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;