import type { profileType } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface profileState {
  profile: profileType | null;
  setProfile: (data: profileType) => void;
  logout: () => void;
}

// export const useProfile = create<profileState>((set) => ({
//   profile: null,
//   setProfile: (data: profileType) => set(() => ({ profile: data })),
//   logout: () =>
//     set(() => ({
//       profile: {} as profileType,
//     })),
// }));

export const useStoreProfile = create<profileState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (data: profileType) =>
        set(() => ({
          profile: data,
        })),
      logout: () => set(() => ({ profile: {} as profileType })),
    }),
    {
      name: "profile",
    }
  )
);
