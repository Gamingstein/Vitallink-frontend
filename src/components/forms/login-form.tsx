"use client";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import Link from "next/link";

export default function LoginForm() {
  const [state, action] = useActionState(login, undefined);
  return (
    <div className="max-w-[600px] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
        Welcome again to VitalLink
      </h2>
      {/* <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Create an account if you don&apos;t have one already
      </p> */}

      <form className="my-8" action={action}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="Enter email address here"
            type="email"
            name="email"
          />
          {state?.errors?.email && <p>{state.errors.email}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Enter password here"
            type="password"
            name="password"
          />
          {state?.errors?.password && <p>Invalid Email or Password</p>}
        </LabelInputContainer>

        <Submit />
      </form>

      <div className="text-center text-neutral-600 dark:text-neutral-300">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline"
        >
          Sign up
        </Link>
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

const Submit = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      type="submit"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Login"}
      <BottomGradient />
    </button>
  );
};
