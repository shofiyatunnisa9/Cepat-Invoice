import { Outlet, useNavigate } from "react-router-dom"

const LayoutAuth = () =>{
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  if(token){
      navigate('/')
  }

  return (
    <div className={"w-screen h-screen flex items-center justify-center"}>
      <Outlet/>
    </div>
  )
}
export default LayoutAuth