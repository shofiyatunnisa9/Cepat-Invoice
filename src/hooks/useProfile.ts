import type { profileType } from "@/types/user";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export function useProfile() {
  const token = Cookies.get("token");

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get<profileType>("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  return { data, isLoading };
}
