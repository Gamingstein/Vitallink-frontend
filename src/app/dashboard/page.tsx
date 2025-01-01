"use client";
import DoctorDashboardPage from "@/components/dashboards/DoctorPage";
import HospitalDashboardPage from "@/components/dashboards/HospitalPage";
import { useUserStore } from "@/store/user";

const DashboardPage = () => {
  const { user } = useUserStore();
  return user?.isAdmin ? <HospitalDashboardPage /> : <DoctorDashboardPage />;
};

export default DashboardPage;
