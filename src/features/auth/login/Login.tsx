import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInputForm } from "@/hooks/useInputForm";
import { authSchema, type authSchemaDTO } from "@/lib/schemas/schemaRegister";
import { Link } from "react-router-dom";
import { useMutateData } from "@/hooks/useMutate";
import { MdOutlineAttachEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";

function Login() {
  const { register, handleSubmit, errors } =
    useInputForm<authSchemaDTO>(authSchema);

  const { mutateAsync, isPending } = useMutateData<authSchemaDTO>({
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
      className="flex flex-col border border-border px-15 py-5 rounded-lg space-y-5"
      onSubmit={handleSubmit(submit)}
    >
      <h1 className="text-center text-xl font-bold">Login</h1>
      <div className="w-80">
        <label
          htmlFor="email"
          className="text-md flex gap-2 items-center font-bold"
        >
          <MdOutlineAttachEmail />
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-md flex gap-2 items-center font-bold"
        >
          <TbPasswordUser />
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
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
        {isPending ? "Loading.." : "Login"}
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
