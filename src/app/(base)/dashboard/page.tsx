"use client";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
const DashboardPage = () => {
  const getUser = useUserStore((state) => state?.getUser);
  useEffect(() => {
    getUser();
  });
  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <h1>Dashboard</h1>
    </div>
  );
};
export default DashboardPage;
