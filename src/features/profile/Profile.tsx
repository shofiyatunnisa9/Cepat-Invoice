import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditProfile } from "@/hooks/useEditProfile";
import { ImagePlus } from "lucide-react";

function Profile() {
  const { form, onSubmit, handleFileChange, isPending } = useEditProfile();
  const { register, formState, handleSubmit } = form;
  const { errors } = formState;

  return (
    <div className="flex justify-center w-auto">
      <Form {...form}>
        <form
          className=" pt-5 w-2/4 space-y-5 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-3xl text-center font-bold">Edit Account Profile</p>

          <div className="flex justify-center">
            <label htmlFor="image" className="relative group cursor-pointer w-fit">
              <img
                className="border-2 rounded-full size-40 object-cover"
                src={`${form.watch("imageUrl")}` || `https://api.dicebear.com/9.x/adventurer/svg?seed=Emery`}
                alt="Profile Preview"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ImagePlus className="text-white w-10 h-10"/>
                </div>
              </label>
            <Input
              type="file"
              id="image"
              hidden
              {...register("image")}
              accept="image/*"
              onChange={handleFileChange}
            />
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
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Profile;
