"use client";
import { useUserStore } from "@/store/user";
import DCSvg from "../base/DCSvg";
import { motion } from "framer-motion";

export default function DashboardCard() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="bg-background w-full h-full flex flex-col justify-center items-center grayscale">
      <div className="relative flex-col flex justify-center items-center w-full">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 2, ease: "easeOut" }}
          className="absolute text-center text-9xl font-display -skew-y-6 cursor-default select-none "
        >
          {user?.name.split(" ")[0]}&#39;s
        </motion.span>
        <div className=" flex flex-col justify-center items-center cursor-default select-none w-full ">
          <DCSvg
            inputText="Admin"
            textClassName="text-9xl font-number"
            fill={false}
          />
          <DCSvg inputText="Dashboard" textClassName="text-9xl font-number" />
        </div>
      </div>
    </div>
  );
}
