import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInputForm } from "@/hooks/useInputForm";
import { authSchema, type authSchemaDTO } from "@/lib/schemas/schemaRegister";
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/utils/api";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useMutateData } from "@/hooks/useMutate";

function Login() {
  const { register, handleSubmit, errors } =
    useInputForm<authSchemaDTO>(authSchema);

  const {
    mutateAsync,
    isPending,
    data: fieldData,
  } = useMutateData<authSchemaDTO>({
    key: "login",
    endpoint: "/login",
    schema: authSchema,
    navigate: "/",
    stores: "setToken",
  });

  const submit = async (data: authSchemaDTO) => {
    await mutateAsync(data);
  };

  return (
    <form
      className="flex flex-col border border-border px-10 py-5 rounded-md space-y-5"
      onSubmit={handleSubmit(submit)}
    >
      <h1 className="text-center text-xl font-bold">Login</h1>
      <div>
        <label htmlFor="email" className="text-md">
          Email:
        </label>
        <Input
          id="email"
          placeholder="Email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="text-md">
          Password:{" "}
        </label>
        <Input
          id="password"
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-destructive">{errors.password.message}</p>
        )}
      </div>
      <Button
        disabled={isPending ? true : false}
        className="text-lg cursor-pointer"
        type="submit"
      >
        Login{" "}
      </Button>
      <div>
        <p>
          Click here to{" "}
          <Link to={"/register"} className="text-primary">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
}
export default Login;
