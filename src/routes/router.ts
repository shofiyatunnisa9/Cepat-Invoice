import LayoutAuth from "@/components/ui/LayoutAuth";
import LayoutDashboard from "@/components/ui/LayoutDashboard";
import DashboardPage from "@/pages/dashboard";

import profilePage from "@/pages/profile";

import loginForm from "@/pages/login-form";

import registerForm from "@/pages/register-form";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    Component: LayoutDashboard,
    children: [
      { path: "/", Component: DashboardPage },
      { path: "/new-invoice" },
      { path: "/profile", Component: profilePage },
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

    children:[
      {path:'/login', Component: loginForm},
      {path:'/register', Component: registerForm}
    ]
  }
])

