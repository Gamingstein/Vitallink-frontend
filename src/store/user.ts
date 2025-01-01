import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCurrentUser, logout } from "@/app/actions/auth";

export type UserType = {
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  username: string;
  doctor?: { id: string | null };
  hospital?: { id: string | null };
} | null;

export type UserStore = {
  user: UserType;
  getUser: () => Promise<void>;
  removeUser: () => Promise<void>;
};

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: null,
      getUser: async () => {
        if ((get() as UserStore).user !== null) {
          return;
        }
        const user = await getCurrentUser();
        if (user.user) {
          set({ user: user.user });
        }
      },
      removeUser: async () => {
        set({
          user: null,
        });
        await logout();
      },
    }),
    {
      name: "loggedUser", // name of the item in the storage (must be unique)
    },
  ),
);
