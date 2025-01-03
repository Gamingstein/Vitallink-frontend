"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const DCSvg = ({
  inputText,
  textClassName,
  className,
  fill = true,
}: {
  inputText: string;
  textClassName?: string;
  className?: string;
  fill?: boolean;
}) => {
  return (
    <div className={cn(`w-full h-full`, className)}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={cn(
            textClassName,
            "z-50 stroke-fscolor fill-transparent stroke-[0.05rem]",
          )}
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
          transition={{ duration: 8, ease: "easeInOut" }}
        >
          {inputText}
        </motion.text>
        {fill && (
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className={cn(textClassName, "z-50 fill-fscolor stroke-none")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2, ease: "easeInOut" }}
          >
            {inputText}
          </motion.text>
        )}
      </svg>
    </div>
  );
};
export default DCSvg;
