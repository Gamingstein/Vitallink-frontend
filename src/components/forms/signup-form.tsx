"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "../ui/file-upload";
import axios from "axios";
import { Switch } from "../ui/switch";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDoctor, setIsDoctor] = useState(false);
  const [gender, setGender] = useState("");
  const [specification, setSpecification] = useState("");

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("fullName", firstname + " " + lastname);
    formData.append("isAdmin", (!isDoctor).toString());
    formData.append("avatar", files[0]);
    if (isDoctor) {
      formData.append("gender", gender);
      formData.append("specification", specification);
    }
    const res = await axios.post(
      "http://localhost:8000/api/v1/users/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (res.status === 201) {
      router.push("/");
    } else {
      console.log("error");
    }
  };

  return (
    <div className="max-w-[900px] mx-auto w-full rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
        Welcome to VitalLink
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login to VitalLink if you have already created an account
      </p>

      <form className="my-8">
        <div className="flex items-start md:flex-row flex-col gap-16">
          <div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="tylerdurden"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
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
              console.log(isDoctor);
            }}
          />
        </LabelInputContainer>

        {isDoctor && (
          <div className="flex items-start md:flex-row flex-col gap-16 mb-8">
            <LabelInputContainer>
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={(val) => {
                  setGender(val);
                }}
                defaultValue={gender}
              >
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
              <Select
                onValueChange={(val) => {
                  setSpecification(val);
                }}
                defaultValue={specification}
              >
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
          onClick={(e) => handleSubmit(e)}
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
