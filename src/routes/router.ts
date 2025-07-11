import ProtectedRoute from "@/components/protectedAuth";
import LayoutAuth from "@/components/ui/LayoutAuth";
import LayoutDashboard from "@/components/ui/LayoutDashboard";
import DashboardPage from "@/pages/DashboardPage";
import invoiceform from "@/pages/invoice-form";
import loginForm from "@/pages/login-form";
import profilePage from "@/pages/ProfilePage";
import registerForm from "@/pages/register-form";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    Component: ProtectedRoute,
    children: [
      {
        Component: LayoutDashboard,
        children: [
          { path: "/", Component: DashboardPage },
          { path: "/profile", Component: profilePage },
          { path: "/invoice", Component: invoiceform },
        ],
      },
    ],
  },
  {
    Component: LayoutAuth,
    children: [
      { path: "/login", Component: loginForm },
      { path: "/register", Component: registerForm },
    ],
  },
]);
