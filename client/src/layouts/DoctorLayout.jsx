import { Outlet } from "react-router-dom";
import Sidebar from "../components/doctor/Sidebar";
import TopNavbar from "../components/doctor/TopNavbar";

const DoctorLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <TopNavbar />

        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;