import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authSchema, type authSchemaDTO } from "@/lib/schemas/schemaRegister";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(authSchema),
  });

  const submit = (data: authSchemaDTO) => {
    console.log(data);
  };
  return (
      <form className="flex flex-col border border-border px-10 py-5 rounded-md space-y-5"
        onSubmit={handleSubmit(submit)}>
        <h1 className="text-center text-xl font-bold">Register</h1>
        <div>
          <label htmlFor="email" className="text-md">
            Email:</label>
          <Input id="email"
            placeholder="Email" type="email "
            {...register("email")}/>
          {errors.email && <p >{errors.email.message}</p>}
          </div>
        <div>
          <label htmlFor="password" className="text-md">
            Password: </label>
          <Input id="password"
            type="password" placeholder="Password"
            {...register("password")}/>
          {errors.password && <p >{errors.password.message}</p>}
          </div>
        <Button className="text-lg cursor-pointer" type="submit">
          Register</Button>
        <div>
          <p>Click here to <Link to={"/login"} className="text-primary">login</Link></p>
          </div>
      </form>
  );
}

export default Register;
