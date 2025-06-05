import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { api } from "@/utils/api";
import { ProfileSchema, type profileDTO } from "@/lib/schemas/schemaProfile";
import Cookies from "js-cookie";

export function useCreateProfile() {
  const form = useForm<profileDTO>({
    mode: "onChange",
    resolver: zodResolver(ProfileSchema),
  });

  const mutation = useMutation({
    mutationKey: ["CreateProfile"],
    mutationFn: async (data: profileDTO) => {
      const formData = new FormData();
      // formData.append("image", data.image);
      formData.append("image", data.image[0]);
      formData.append("company", data.company);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("address", data.address);

      const token = Cookies.get("token");

      const res = await api.post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile saved!");
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
    console.log(files[0]);
  };

  const onSubmit = async (data: profileDTO) => {
    console.log(data);
    await mutation.mutateAsync(data);
  };

  return { form, onSubmit, isPending: mutation.isPending, handleFileChange };
}
