"use client";
import { useUserStore } from "@/store/user";
import { IconLogout } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect } from "react";

const Navbar = () => {
  const { user, removeUser } = useUserStore();
  const isUserLoggedIn = user === null ? false : true;

  useEffect(() => {}, [user]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent px-64 flex justify-between z-10 before:block before:absolute before:inset-0 before:bg-background before:-z-10 before:opacity-75 backdrop-blur-2xl">
      <Link href={"/home#"}>
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
            <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <button
            onClick={async () => {
              await removeUser();
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
