import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileSchema, type profileDTO } from "@/lib/schemas/schemaProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<profileDTO>({
    mode: "onChange",
    resolver: zodResolver(profileSchema),
  });

  const submit = (data: profileDTO) => {
    console.log(data);
  };
  return (
    <div className="flex justify-center w-auto ">
      <form
        className="p-10 space-y-5 items-center"
        onSubmit={handleSubmit(submit)}
      >
        <p className="text-3xl text-center font-bold">Account Profile</p>
        <div>
          <label htmlFor="image">
            <img
              className="border-2 rounded-full size-20"
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=Emery"
            />
          </label>
          <Input type="file" id="image" hidden />
          <p className="text-sm">Upload Profile</p>
        </div>

        <div>
          <label htmlFor="company">Company : </label>
          <Input
            id="company"
            placeholder="Company"
            className="border-3 w-120"
            {...register("company")}
          />
          {errors.company && (
            <p className="text-red-600">{errors.company.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone">No Telp: </label>
          <Input
            id="phone"
            placeholder="(+62 ) 8"
            className="border-3"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <Input
            id="address"
            placeholder="Address"
            className="border-3"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-600">{errors.address.message}</p>
          )}
        </div>

        <Button type="submit" className="cursor-pointer">
          Save Change
        </Button>
      </form>
    </div>
  );
}

export default Profile;
