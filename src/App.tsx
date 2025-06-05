import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "@/styles/globals.css";
import { UserProvider } from "./contexts/user";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />;
    </UserProvider>
  );
}

export default App;
