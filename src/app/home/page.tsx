"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Home() {
  return (
    <AuroraBackground>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="w-2/3">
          <h1 className="text-black dark:text-white font-mono text-7xl">
            VitalLink{" "}
            <FlipWords
              words={["Your Health", "Your Link"]}
              className="text-pretty"
            />
          </h1>
          <div className="text-left">
            <TextGenerateEffect
              words={`At VitalLink, we provide innovative solutions to enhance healthcare delivery, streamline communication between healthcare providers and patients, and ensure effective management of health data for better outcomes. Join us on a journey towards a healthier future!`}
              duration={0.5}
            />
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}
