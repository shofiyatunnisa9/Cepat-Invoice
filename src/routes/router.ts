import LayoutAuth from "@/components/ui/LayoutAuth";
import LayoutDashboard from "@/components/ui/LayoutDashboard";
import DashboardPage from "@/pages/dashboard";
import invoiceform from "@/pages/invoice-form";
import profilePage from "@/pages/profile";
import registerForm from "@/pages/register-form";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    Component: LayoutDashboard,
    children: [
      { path: "/", Component: DashboardPage },
      { path: "/new-invoice" },
      { path: "/profile", Component: profilePage },
      { path: "/invoice", Component: invoiceform },
    ],
  },
  {
    Component: LayoutAuth,

    children: [
      { path: "/login" },
      { path: "/register", Component: registerForm },
    ],
  },
]);
