import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/utils/api";
import { ProfileSchema, type profileDTO } from "@/lib/schemas/schemaProfile";
import Cookies from "js-cookie";
import { useProfile } from "./useProfile";
import { useEffect } from "react";

export function useEditProfile() {
  const { UserProfile } = useProfile();

  const form = useForm<profileDTO>({
    mode: "onChange",
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      company: "",
      address: "",
      phoneNumber: "",
      image: undefined,
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (UserProfile) {
      form.reset({
        company: UserProfile.company,
        phoneNumber: UserProfile.phone,
        address: UserProfile.address,
        imageUrl: UserProfile.image,
      });
    }
  }, [UserProfile, form]);

  const mutation = useMutation({
    mutationKey: ["EditProfile"],
    mutationFn: async (data: profileDTO) => {
      const formData = new FormData();

      formData.append("company", data.company);
      formData.append("address", data.address);
      formData.append("phoneNumber", data.phoneNumber);

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const res = await api.patch("/profile", formData);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile Edited!");
      form.reset();
    },
    onError: (err: any) => {
      console.log(Cookies.get("token"));
      toast.error(err?.response?.data?.message || "Failed to save profile.");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    form.setValue("image", files);
    form.setValue("imageUrl", URL.createObjectURL(file));
  };

  const onSubmit = async (data: profileDTO) => {
    await mutation.mutateAsync(data);
  };

  return { form, onSubmit, isPending: mutation.isPending, handleFileChange };
}
