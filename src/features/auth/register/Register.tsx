import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authSchema, type authSchemaDTO } from "@/lib/schemas/schemaRegister";
import { Link, useNavigate } from "react-router-dom";
import { useInputForm } from "@/hooks/useInputForm";
import { toast } from "sonner";
import { api } from "@/utils/api";
function Register() {
  const { register, handleSubmit, errors } =
    useInputForm<authSchemaDTO>(authSchema);

  const navigate = useNavigate();
  const submit = async (data: authSchemaDTO) => {
    try {
      console.log(data);
      const res = await api.post("/register", data);
      toast.success("Register succes!");
      navigate("/login");
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  return (
    <form
      className="flex flex-col border border-border px-10 py-5 rounded-md space-y-5"
      onSubmit={handleSubmit(submit)}
    >
      <h1 className="text-center text-xl font-bold">Register</h1>
      <div>
        <label htmlFor="email" className="text-md">
          Email:
        </label>
        <Input
          id="email"
          placeholder="Email"
          type="email "
          {...register("email")}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="text-md">
          Password:{" "}
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <Button className="text-lg cursor-pointer" type="submit">
        Register
      </Button>
      <div>
        <p>
          Click here to{" "}
          <Link to={"/login"} className="text-primary">
            login
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
