import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useStoreProfile } from "@/store/user";
import { isAxiosError } from "axios";

const LayoutDashboard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // fech to api auth-check
  // token valid
  // token tidak valid hapus token
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { setProfile, logout } = useStoreProfile();
  useEffect(() => {
    setIsLoading(true);
    if (isLoading) {
      api
        .get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfile(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err) {
            Cookies.remove("token");
            logout();
            navigate("/login");
          }
        });
    }
  }, [token, isLoading, setIsLoading]);

  if (isLoading) <h1>Loading!!!</h1>;
  return (
    <div className="grid grid-cols-[250px_1fr] w-full h-screen ">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default LayoutDashboard;

// grid grid-cols-[250px_1fr] w-full h-screen
