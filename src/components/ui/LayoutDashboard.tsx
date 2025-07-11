import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const LayoutDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar fixed */}
      <div className="fixed top-0 left-0 h-screen w-[250px] ">
        <Sidebar />
      </div>

      {/* Konten di kanan */}
      <div className="ml-[250px] h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};
export default LayoutDashboard;
