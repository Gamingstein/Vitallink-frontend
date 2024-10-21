"use client";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";

export type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
} | null;

const Navbar = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-background dark:bg-primary-foreground backdrop-opacity-10 backdrop-blur-xl px-64 flex justify-between border-b-white">
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
      {user ? (
        <div className={`flex gap-8 items-center justify-end`}>
          <Avatar>
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.username[0]}</AvatarFallback>
          </Avatar>
          <Link href={"#"} className="text-foreground font-bold">
            Logout
          </Link>
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
