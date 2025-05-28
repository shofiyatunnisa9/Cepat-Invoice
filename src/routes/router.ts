import DashboardPage from "@/pages/dashboard";
import registerForm from "@/pages/register-form";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardPage,
  },
  {
    path: "/register",
    Component: registerForm,
  },
]);
