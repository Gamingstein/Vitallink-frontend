"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LogIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      {
        email: email,
        username: username,
        password: password,
      },
    );
    console.log(response?.data);
    if (response.status === 200) {
      router.push("/");
    } else {
      console.log("error");
    }
  };
  return (
    <div className="max-w-[600px] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
        Welcome again to VitalLink
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Create an account if you don&apos;t have one already
      </p>

      <form className="my-8">
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="Enter email address here"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LabelInputContainer>
        <div className="w-full text-center">OR</div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Enter username here"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Enter password here"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Log in &rarr;
          <BottomGradient />
        </button>
      </form>
      {/* <div className="text-center mt-4">
        <a
          href="#"
          className="text-neutral-600 dark:text-neutral-300 hover:underline"
        >
          Forgot password?
        </a>
      </div> */}
      <div className="text-center text-neutral-600 dark:text-neutral-300">
        Don&apos;t have an account?{" "}
        <a
          href="/auth/signup"
          className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline"
        >
          Sign up
        </a>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
