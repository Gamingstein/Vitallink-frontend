"use client";
import { useUserStore } from "@/store/user";

export default function DashboardCard() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="bg-background w-full h-full flex flex-col justify-center items-center grayscale">
      <div className="relative flex-col flex justify-center items-center">
        <span className="absolute text-center text-9xl font-display -skew-y-6 cursor-default select-none">
          {user?.name.split(" ")[0]}&#39;s
        </span>
        <span className="cursor-default select-none text-center font-number text-9xl text-transparent bg-gradient-to-r from-[#123456] to-[#1cb5e0] bg-clip-text leading-none">
          Admin
          <br />
          Dashboard
        </span>
      </div>
    </div>
  );
}
