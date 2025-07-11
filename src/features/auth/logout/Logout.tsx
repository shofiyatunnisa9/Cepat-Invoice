import { Button } from "@/components/ui/button";
import { useStoreProfile } from "@/store/user";
import Cookies from "js-cookie";
import { CgLogOut } from "react-icons/cg";

import { useNavigate } from "react-router-dom";

export function LogOut() {
  const { logout } = useStoreProfile();
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    logout();
    navigate("/login");
  };
  return (
    <div className="pt-5">
      <Button onClick={handleLogout} className=" w-50 text-lg cursor-pointer">
        <CgLogOut />
        Logout
      </Button>
    </div>
  );
}
