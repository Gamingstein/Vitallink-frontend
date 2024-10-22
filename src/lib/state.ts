import { atom } from "recoil";

export type User = {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  isAdmin: boolean;
} | null;

export const userState = atom<User>({
  key: "userState",
  default: {
    _id: "",
    username: "Gamingstein",
    email: "",
    avatar: "",
    fullName: "Gamingstein",
    isAdmin: false,
  },
});
