import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateProfile } from "@/hooks/useCreateProfile";

function Profile() {
  const { form, onSubmit, isPending } = useCreateProfile();
  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  return (
    <div className="flex justify-center w-auto">
      <Form {...form}>
        <form
          className=" pt-5 w-2/4 space-y-5 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-3xl text-center font-bold">Account Profile</p>

          <div>
            <label htmlFor="image">
              <img
                className="border-2 rounded-full size-20"
                src="https://api.dicebear.com/9.x/adventurer/svg?seed=Emery"
              />
            </label>
            <Input
              type="file"
              id="image"
              hidden
              {...register("image")}
              accept="image/*"
              // onChange={(e) => {
              //   handleFileChange(e);
              // }}
            />
            {/* {errors.image && (
              <p className="text-destructive">
                {errors.image.message?.toString()}
              </p>
            )} */}

            <p className="text-sm">Upload Profile</p>
          </div>

          <div>
            <label htmlFor="company">Company:</label>
            <Input
              id="company"
              placeholder="Company"
              {...register("company")}
            />
            {errors.company && (
              <p className="text-red-600">{errors.company.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber">No Telp:</label>
            <Input
              id="phoneNumber"
              placeholder="(+62) 8"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <Input
              id="address"
              placeholder="Address"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-600">{errors.address.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending} className="cursor-pointer">
            Save Change
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Profile;
