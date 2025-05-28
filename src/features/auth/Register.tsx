import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authSchema, type authSchemaDTO } from "@/lib/schemas/schemaRegister";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
    <div className="w-screen h-screen">
      <form
        className="flex justify-center items-center h-full  text-center "
        onSubmit={handleSubmit(submit)}
      >
        <div className="bg-blue-500 p-10 pt-2 rounded-xl border w-sm">
          <h1 className="text-black font-bold my-5 text-3xl">Register Pages</h1>
          <div className="my-2 text-left">
            <label htmlFor="email" className="w-">
              Email:
            </label>
            <Input
              className="text-black border bg-white/30"
              placeholder="Email"
              type="email "
              id="email"
              {...register("email")}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="my-5 text-left">
            <label htmlFor="password" className="">
              Password:
            </label>
            <Input
              className="text-black border bg-white/30"
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <Button className="bg-blue-950 cursor-pointer px-15" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Register;
