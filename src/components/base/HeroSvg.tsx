"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const HeroSvg = ({ name, className }: { name: string; className?: string }) => {
  return (
    <div className="w-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 75"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={cn(
            className,
            "z-50 stroke-foreground fill-transparent stroke-[0.02rem]",
          )}
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
          transition={{ duration: 8, ease: "easeInOut" }}
        >
          {name}
        </motion.text>
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={cn(className, "z-50 fill-foreground stroke-none")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2, ease: "easeInOut" }}
        >
          {name}
        </motion.text>
      </svg>
    </div>
  );
};
export default HeroSvg;
