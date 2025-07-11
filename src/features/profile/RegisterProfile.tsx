import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateProfile } from "@/features/profile/useCreateProfile";
import { useState } from "react";

function RegisterProfile() {
  const { form, onSubmit, isPending } = useCreateProfile();
  const { register, formState, handleSubmit, setValue } = form;
  const { errors } = formState;
  const [preview, setPreview] = useState<string | undefined>(undefined);

  return (
    <div className="flex justify-center w-auto">
      <Form {...form}>
        <form
          className=" pt-5 w-2/4 space-y-5 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-3xl text-center font-bold">
            Create Account Profile
          </p>

          <div className="px-55">
            <label htmlFor="image">
              <img
                className="rounded-full size-30"
                src={
                  preview ?? "https://api.dicebear.com/9.x/icons/svg?seed=Brian"
                }
              />
            </label>
            <Input
              type="file"
              id="image"
              hidden
              {...register("image")}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  const dataTransfer = new DataTransfer();
                  dataTransfer.items.add(file);
                  const fileList = dataTransfer.files;
                  setValue("image", fileList);
                }
              }}
            />
            <p className="text-sm text-center">Upload Profile</p>
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

export default RegisterProfile;
