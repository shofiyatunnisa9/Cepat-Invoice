import DashboardPage from "@/pages/dashboard";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path:'/',
    Component: DashboardPage
  }
])