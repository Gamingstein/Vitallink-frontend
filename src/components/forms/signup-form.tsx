"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FileUpload } from "../ui/file-upload";
import { Switch } from "../ui/switch";
import { signup } from "@/app/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import React, { useState } from "react";

export function SignupForm() {
  const { pending } = useFormStatus();
  const [files, setFiles] = useState<File[]>([]);
  const [isDoctor, setIsDoctor] = useState(false);
  const [state, action] = useFormState(signup, undefined);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  return (
    <div className="max-w-[900px] mx-auto w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
        Welcome to VitalLink
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to VitalLink if you have already created an account
      </p>

      <form
        className="my-8"
        action={(formData: FormData) => {
          formData.append("avatar", files[0]);
          formData.append("isAdmin", (!isDoctor).toString());
          action(formData);
        }}
      >
        <div className="flex items-start md:flex-row flex-col gap-16">
          <div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  name="firstname"
                />
                {state?.errors?.firstname && <p>{state.errors.firstname}</p>}
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  name="lastname"
                />
                {state?.errors?.lastname && <p>{state.errors.lastname}</p>}
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="tylerdurden"
                type="text"
                name="username"
              />
              {state?.errors?.username && <p>{state.errors.username}</p>}
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                name="email"
              />
              {state?.errors?.email && <p>{state.errors.email}</p>}
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                name="password"
              />
              {state?.errors?.password && (
                <div>
                  <p>Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4 space-y-2 md:space-y-0 md:space-x-2 max-w-[400px]">
            <Label htmlFor="avatar">Avatar</Label>
            <FileUpload onChange={handleFileUpload} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="flex mb-8">
          <Label htmlFor="isDoctor">I am a doctor</Label>
          <Switch
            id="isDoctor"
            checked={isDoctor}
            onCheckedChange={() => {
              setIsDoctor(!isDoctor);
            }}
          />
        </LabelInputContainer>

        {isDoctor && (
          <div className="flex items-start md:flex-row flex-col gap-16 mb-8">
            <LabelInputContainer>
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender">
                <SelectTrigger className="w-[370px]">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="specification">Specification</Label>
              <Select name="specification">
                <SelectTrigger className="w-[370px]">
                  <SelectValue placeholder="Select specification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="cardiologist">Cardiologist</SelectItem>
                    <SelectItem value="surgeon">Surgeon</SelectItem>
                    <SelectItem value="dentist">Dentist</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>
          </div>
        )}
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={pending}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
      <div className="text-center text-neutral-600 dark:text-neutral-300">
        Already have an account?{" "}
        <a
          href="/auth/login"
          className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline"
        >
          Login
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
