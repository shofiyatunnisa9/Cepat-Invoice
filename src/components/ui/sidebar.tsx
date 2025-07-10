import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo1 from "@/assets/img/logo1.png";
import LogoutPage from "@/pages/logout";

const Sidebar = () => {
  return (
    <div className="bg-cyan-200 p-4 flex flex-col gap-5">
      <div className="text-2xl font-bold">
        <img className="w-35 ml-10 mt-5" src={logo1} />
      </div>

      <div className="text-lg">
        <p className="flex items-center gap-2 p-2">
          <FaHome />
          <Link to={"/"}>Home</Link>
        </p>
        <p className="flex items-center gap-2 p-2">
          <CgProfile />
          <Link to={"/profile"}>Profile</Link>
        </p>
        <p className="flex items-center gap-2 p-2">
          <FaFileInvoiceDollar />
          <Link to={"/invoice"}>Invoice</Link>
        </p>
      </div>
      <LogoutPage />
    </div>
  );
};

export default Sidebar;
