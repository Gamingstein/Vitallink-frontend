"use client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IconLogout } from "@tabler/icons-react";
import { logout } from "@/app/actions/auth";
import { UserType, useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";

const Navbar = ({ user }: { user: UserType }) => {
  const router = useRouter();
  const removeUser = useUserStore((state) => state?.removeUser);
  const isUserLoggedIn = user.name === "" ? false : true;
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-muted dark:bg-primary-foreground backdrop-opacity-10 backdrop-blur-xl px-64 flex justify-between border-b-white">
      <Link href={"/home"}>
        <Image
          src={"/assets/logo.png"}
          width={400}
          height={400}
          alt="Vitallink Logo"
          className={`object-cover h-16 w-32 dark:saturate-0 dark:contrast-200 dark:brightness-200 cursor-pointer`}
        />
      </Link>

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
              router.push("/home");
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
