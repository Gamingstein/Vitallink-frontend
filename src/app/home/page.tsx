"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";

export default function Home() {
  const getUser = useUserStore((state) => state.getUser);
  useEffect(() => {
    getUser();
  });
  return (
    <BackgroundLines>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="w-2/3">
          <h2 className="text-foreground text-center text-7xl font-extrabold font-display">
            Your Health, Your Link
          </h2>
          <div>
            <TextGenerateEffect
              words={`At VitalLink, we provide innovative solutions to enhance healthcare delivery, streamline communication between healthcare providers and patients, and ensure effective management of health data for better outcomes. Join us on a journey towards a healthier future!`}
              duration={1.5}
              filter={false}
              className="text-foreground text-center text-4xl font-semibold font-sans"
            />
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
}
