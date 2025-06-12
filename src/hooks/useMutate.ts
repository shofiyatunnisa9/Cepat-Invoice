import { useStoreProfile } from "@/store/user";
import { api } from "@/utils/api";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";
import type { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { ZodType } from "zod";

type UseMutateProps<T extends FieldValues> = {
  key: string;
  schema: ZodType<T>;
  endpoint: string;
  navigate?: string;
  stores?: "setData" | "setToken";
  isFormData?: boolean; // <-- Optional flag
};

export const useMutateData = <T extends FieldValues>({
  key,
  schema,
  endpoint,
  navigate,
  stores,
  isFormData = false,
}: UseMutateProps<T>): UseMutationResult<T, unknown, T> => {
  const nav = useNavigate();
  const { setProfile } = useStoreProfile();
  return useMutation<T, unknown, T>({
    mutationKey: [key],
    mutationFn: async (data: T) => {
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new Error("Validation failed");
      }

      const payload = isFormData
        ? (() => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
              if (value instanceof FileList) {
                Array.from(value).forEach((file) => {
                  formData.append(key, file);
                });
              } else if (value instanceof File) {
                formData.append(key, value);
              } else {
                formData.append(key, String(value));
              }
            });
            return formData;
          })()
        : data;

      const headers = isFormData
        ? { "Content-Type": "multipart/form-data" }
        : { "Content-Type": "application/json" };

      const res = await api.post(endpoint, payload, {
        headers,
      });

      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res.message ?? "Success");
      //// nanti urus lagi
      if (stores == "setToken") {
        Cookies.set("token", res.token);
      }
      /// ini nanti di bnerin lagi
      if (stores == "setData") {
        setProfile(res.data);
      }

      if (navigate) {
        nav(navigate);
      }
    },
    onError: (err) => {
      if (isAxiosError(err)) {
        toast.error(err?.response?.data?.message ?? "Something went wrong");
      } else {
        toast.error("Unknown error");
      }
    },
  });
};
