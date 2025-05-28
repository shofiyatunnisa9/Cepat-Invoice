import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authSchema, type authSchemaDTO } from "@/lib/schemas/schemaRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<authSchemaDTO>({
    resolver: zodResolver(authSchema),
    mode: "onChange"
  })
  const submit = (data: authSchemaDTO) => {
    console.log(data)
  }

  return (
    <form className="flex flex-col border border-border px-10 py-5 rounded-md space-y-5"
      onSubmit={handleSubmit(submit)}>
      <h1 className="text-center text-xl font-bold">Login</h1>
      <div>
        <label htmlFor="email" className="text-md">
          Email:</label>
        <Input id="email"
        placeholder="Email" type="email"
        {...register("email")}/>
        {errors.email && <p className="text-destructive">{errors.email.message}</p>}
        </div>
      <div>
        <label htmlFor="password" className="text-md">
          Password: </label>
        <Input id="password"
        placeholder="Password" type="password"
        {...register("password")}/>
        {errors.password && <p className="text-destructive">{errors.password.message}</p>}
        </div>
      <Button className="text-lg cursor-pointer" type="submit">
        Login </Button>
      <div>
        <p>Click here to <Link to={"/register"} className="text-primary">Register</Link></p>
        </div>
      </form>
  );
}

export default Login;
