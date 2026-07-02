import { Outlet } from "react-router-dom";
import Sidebar from "../components/patient/Sidebar";

const PatientLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1">

        <header className="bg-white shadow px-8 py-5">
          <h2 className="text-3xl font-bold">
            Patient Dashboard
          </h2>
        </header>

        <main className="p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default PatientLayout;