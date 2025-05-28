import { cn } from "@/lib/utils"
import { Outlet, useNavigate } from "react-router-dom"

const LayoutAuth = () =>{
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const style = cn("w-screen h-screen flex items-center justify-center")

  if(token){
      navigate('/')
  }

  return (
    <div className={style}>
      <Outlet/>
    </div>
  )
}
export default LayoutAuth