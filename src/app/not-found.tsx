"use client";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const path = usePathname();
  return (
    <div className="h-dvh flex flex-col justify-center items-center">
      <div className="relative flex justify-center items-center">
        <div className="bg-gradient-to-br from-[#000046] to-[#1cb5e0] flex items-center justify-center">
          <p className="inline-block text-[25rem] font-bold font-number bg-background text-white mix-blend-darken">
            404
          </p>
        </div>
        <div className="absolute flex flex-col drop-shadow">
          <p className="inline-block text-[15rem] text-center text-sky-200 leading-tight font-bold font-display">
            Broken
          </p>
          <p className="inline-block text-[15rem] text-center text-sky-200 leading-tight font-bold font-display">
            Link
          </p>
        </div>
      </div>
      <h2 className="text-3xl text-muted-foreground">{path} does not exist.</h2>
    </div>
  );
}
