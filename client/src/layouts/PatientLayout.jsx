import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PatientLayout = () => {
  const navigate = useNavigate();
  const { user,logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6">

        <h1 className="text-2xl font-bold mb-8">
          🩺 AI Doctor
        </h1>

        <nav className="flex flex-col gap-3 flex-1">

          <NavLink
            to="/patient/dashboard"
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
            to="/patient/book-appointment"
            className={({ isActive }) =>
              `p-3 rounded transition ${
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

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-600 hover:bg-red-700 transition rounded-lg py-3 font-semibold"
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <div className="flex-1">

        {/* Navbar */}
        <header className="bg-white shadow px-8 py-5 flex justify-between">
          <h2 className="text-3xl font-bold">
            Patient Dashboard
          </h2>

          <h2 className="text-lg font-semibold">
             Welcome, {user?.name}
          </h2>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default PatientLayout;