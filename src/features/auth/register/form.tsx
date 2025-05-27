import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { Form } from "react-router-dom"
import { z } from "zod"

const RegisterForm = () => {
  const form = useForm()
  return(
    <Form>
      
      <Input placeholder="email"/>
      <Input placeholder="password"/>
      <Button>Register</Button>
    </Form>    
  )
}
const registerSchema = z.object({})