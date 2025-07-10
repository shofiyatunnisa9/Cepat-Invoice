import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const LayoutDashboard = () => {
  return (
    <>
      <div className=" grid grid-cols-[250px_1fr] w-full h-screen ">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};
export default LayoutDashboard;
