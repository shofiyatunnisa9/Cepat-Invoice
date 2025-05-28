import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const LayoutAuth = () =>{
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  if(token){
      navigate('/')
  }

  return (
    <Outlet/>
  )
}
export default LayoutAuth