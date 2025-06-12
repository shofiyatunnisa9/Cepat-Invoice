import LayoutAuth from "@/components/ui/LayoutAuth";
import LayoutDashboard from "@/components/ui/LayoutDashboard";
import DashboardPage from "@/pages/dashboard";
import invoiceform from "@/pages/invoice-form";
import InvoiceDoc from "@/pages/invoiceDoc";
import loginForm from "@/pages/login-form";
import profilePage from "@/pages/profile";
import ProfileEdit from "@/pages/ProfileEdit";
import registerForm from "@/pages/register-form";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    Component: LayoutDashboard,
    children: [
      { path: "/", Component: DashboardPage },
      { path: "/profile", Component: profilePage },
      { path: "/profile/:id", Component: ProfileEdit },
      { path: "/invoice", Component: invoiceform },
      { path: "/preview-invoice", Component: InvoiceDoc },
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
