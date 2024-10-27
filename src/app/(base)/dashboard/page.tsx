"use client";
import { useUserStore } from "@/store/user";
import { useLayoutEffect } from "react";
import HospitalDashboard from "@/components/dashboards/HospitalDashboard";
import DoctorDashboard from "@/components/dashboards/DoctorDashboard";

const DashboardPage = () => {
  const { user, getUser } = useUserStore();

  useLayoutEffect(() => {
    getUser();
  });

  return (
    <div className="h-full flex justify-center items-center pt-16">
      {user.isAdmin ? <HospitalDashboard /> : <DoctorDashboard />}
    </div>
  );
};

export default DashboardPage;
