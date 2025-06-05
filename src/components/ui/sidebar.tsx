import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import { useStoreProfile } from "@/store/user";
import Cookies from "js-cookie";
import { Button } from "./button";

const Sidebar = () => {
  const { profile } = useStoreProfile();
  return (
    <div className="bg-cyan-200 p-4 flex flex-col gap-5">
      <div className="text-2xl font-bold">
        {/* <h1>PT.Fast Invoice</h1> */}
        <img className="w-35 ml-2 mt-5" src={profile?.image} />
        {/* <img className="w-35 ml-10" src={logo2} />
        <img className="w-35 ml-10 mt-5" src={logo3} /> */}
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
      <LogOut />
    </div>
  );
};

const LogOut = () => {
  const { logout } = useStoreProfile();
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    logout();
    navigate("/login");
  };
  return <Button onClick={handleLogout}>logout</Button>;
};
export default Sidebar;
