import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!Cookies.get("token");
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
