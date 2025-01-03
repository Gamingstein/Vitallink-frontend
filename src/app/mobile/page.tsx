"use client";
import HeroSvg from "@/components/base/HeroSvg";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  "#e81416",
  "#ffa500",
  "#faeb36",
  "#79c314",
  "#487de7",
  "#4b369d",
  "#70369d",
];

export default function MobilePage() {
  return (
    <div className="relative h-full flex flex-col justify-center items-center">
      <AnimatePresence>
        <div
          key="background"
          className="h-full w-full flex flex-col justify-center items-center overflow-hidden"
        >
          <motion.div
            initial={{
              rotate: 45,
            }}
            animate={{
              x: [-50, 50, -50],
              y: [50, -50, 50],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: 5,
            }}
            className="h-[1000px] w-[1000px] flex flex-col justify-between"
          >
            {COLORS.map((color, index) => (
              <motion.div
                key={index}
                initial={{
                  alignSelf: index % 2 === 0 ? "start" : "end",
                }}
                animate={{
                  alignSelf: [
                    "initial",
                    "initial",
                    index % 2 === 0 ? "end" : "start",
                    index % 2 === 0 ? "end" : "start",
                  ],
                  width: [`0%`, "100%", "0%", "100%"],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                }}
                style={{ backgroundColor: color }}
                className={`h-6 w-48 rounded-xl`}
              ></motion.div>
            ))}
          </motion.div>
        </div>
        <div
          key="foreground"
          className="absolute inset-0 h-dvh w-full flex flex-col justify-center items-center bg-transparent backdrop-blur-xl"
        >
          <HeroSvg
            name="VitalLink"
            className="text-5xl font-number landscape:text-3xl"
          />
          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="text-center bg-foreground text-background rounded-xl p-8 landscape:p-4 landscape:rounded-lg"
          >
            <span className="text-4xl font-number landscape:text-2xl">
              Download
            </span>
            <br />
            <span className="font-number landscape:hidden landscape:mb-8">
              Our Mobile Application
            </span>
          </motion.h1>
        </div>
      </AnimatePresence>
    </div>
  );
}
