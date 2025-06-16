import { Outlet } from "react-router-dom";

const LayoutAuth = () => {
  // const [isLogin, setIsLogin] = useState<boolean>(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     return setIsLogin(false);
  //   }
  //   setIsLogin(true);
  // }, [isLogin]);

  // if (isLogin) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <div className={"w-screen h-screen flex items-center justify-center"}>
      <Outlet />
    </div>
  );
};
export default LayoutAuth;
