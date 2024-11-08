import { getCurrentUser } from "@/app/actions/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserType = {
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  username: string;
  doctor?: { id: string | null };
  hospital?: { id: string | null };
};

export type UserStore = {
  user: UserType;
  getUser: () => Promise<void>;
  removeUser: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: {
        name: "",
        avatar: "",
        email: "",
        username: "",
        isAdmin: false,
        doctor: {
          id: "",
        },
        hospital: {
          id: "",
        },
      },
      getUser: async () => {
        if ((get() as UserStore).user.name !== "") {
          console.log("already fetched. returning...");
          return;
        }
        console.log("getting user...");
        const user = await getCurrentUser();
        if (user.user) {
          set({ user: user.user });
        } else {
          console.log(user.error);
          set({
            user: {
              name: "",
              email: "",
              avatar: "",
              isAdmin: false,
              username: "",
              doctor: {
                id: null,
              },
              hospital: {
                id: null,
              },
            },
          });
        }
      },
      removeUser: () => {
        set({
          user: {
            name: "",
            email: "",
            avatar: "",
            isAdmin: false,
            username: "",
            doctor: {
              id: null,
            },
            hospital: {
              id: null,
            },
          },
        });
      },
    }),
    {
      name: "user", // name of the item in the storage (must be unique)
    }
  )
);
