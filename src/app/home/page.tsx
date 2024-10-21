import { BackgroundLines } from "@/components/ui/background-lines";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Home() {
  return (
    <BackgroundLines>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="w-2/3">
          <h2 className="text-foreground text-center text-7xl font-extrabold">
            Your Health, Your Link
          </h2>
          <div className="text-center font-mono">
            <TextGenerateEffect
              words={`At VitalLink, we provide innovative solutions to enhance healthcare delivery, streamline communication between healthcare providers and patients, and ensure effective management of health data for better outcomes. Join us on a journey towards a healthier future!`}
              duration={0.5}
            />
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
}
