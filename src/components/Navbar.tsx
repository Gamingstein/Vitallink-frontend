"use client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";
import { logout } from "@/app/actions/auth";
import { UserType, useUserStore } from "@/store/user";
// import { useEffect } from "react";

const Navbar = ({ user }: { user: UserType }) => {
  const removeUser = useUserStore((state) => state?.removeUser);
  const isUserLoggedIn = user.name === "" ? false : true;
  const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-muted dark:bg-primary-foreground backdrop-opacity-10 backdrop-blur-xl px-64 flex justify-between border-b-white">
      <Image
        src={"/assets/logo.png"}
        width={400}
        height={400}
        alt="logo"
        className={`object-cover h-16 w-32 dark:saturate-0 dark:contrast-200 dark:brightness-200 cursor-pointer`}
        onClick={() => {
          router.push("/home");
        }}
      />

      {isUserLoggedIn ? (
        <div className={`flex gap-8 items-center justify-end`}>
          <Avatar>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              {user?.username[0].toUpperCase() || "@"}
            </AvatarFallback>
          </Avatar>
          <button
            onClick={async () => {
              removeUser();
              await logout();
            }}
          >
            <IconLogout className="size-6 text-foreground" />
          </button>
        </div>
      ) : (
        <div className={`flex gap-8 items-center justify-end`}>
          <Link
            href={"/auth/login"}
            className="text-foreground font-bold p-2 rounded-md px-4"
          >
            Login
          </Link>
          <Link
            href={"/auth/signup"}
            className="text-background font-bold bg-secondary-foreground p-2 rounded-md px-4"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
