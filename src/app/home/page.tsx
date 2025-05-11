"use client";
import HeroSvg from "@/components/base/HeroSvg";
import { BackgroundLines } from "@/components/ui/background-lines";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Home() {
  const getUser = useUserStore((state) => state.getUser);
  useEffect(() => {
    getUser();
  });
  return (
    <div id="">
      <BackgroundLines className="h-dvh w-full flex flex-col justify-center items-center">
        <div className="w-2/3">
          <div className="flex items-center justify-center">
            <HeroSvg name="VitalLink" className="text-5xl font-number" />
          </div>
          <h2 className="text-foreground text-center text-7xl font-extrabold font-display animate-title-in">
            Your Health, Your Link
          </h2>
        </div>
      </BackgroundLines>
      <div
        className="h-dvh w-full flex flex-col justify-center items-center"
        id="mission"
      >
        <AnimatePresence>
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="text-8xl font-display p-8"
            key="title"
          >
            Our Mission
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="w-2/3"
            key="content"
          >
            <h1 className="text-foreground text-center text-4xl font-semibold font-sans">
              At VitalLink, we provide innovative solutions to enhance
              healthcare delivery, streamline communication between healthcare
              providers and patients, and ensure effective management of health
              data for better outcomes. Join us on a journey towards a healthier
              future!
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
