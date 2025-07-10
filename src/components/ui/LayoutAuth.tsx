import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
  return (
    <div className={"w-screen h-screen flex items-center justify-center"}>
      <Outlet />
    </div>
  );
};
export default LayoutAuth;
