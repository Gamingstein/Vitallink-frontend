"use client";
import DoctorCard from "@/components/cards/DoctorCard";
import PatientCard from "@/components/cards/PatientCard";
import { useUserStore } from "@/store/user";
import { useQuery, gql } from "@apollo/client";
import SensorCard from "../cards/SensorCard";
import { Skeleton } from "../ui/skeleton";
import DashboardCard from "../cards/DashboardCard";

const GET_HOSPITAL = gql`
  query Hospital($hospitalId: ID!) {
    hospital(id: $hospitalId) {
      patients {
        id
      }
      doctors {
        id
      }
      sensors {
        id
      }
    }
  }
`;

const HospitalDashboardPage = () => {
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useQuery(GET_HOSPITAL, {
    variables: { hospitalId: user?.hospital?.id },
  });
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center pt-16 gap-8">
        <Skeleton className="w-96 h-64" />
        <Skeleton className="w-96 h-64" />
        <Skeleton className="w-96 h-64" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-full flex flex-col justify-center items-center pt-16">
        <h1 className="text-9xl font-bold font-number">Oops!!</h1>
        <h1 className="text-7xl font-bold font-display">An Error Occurred!</h1>
        <h2 className="text-3xl text-muted-foreground mt-20">
          {error.message}
        </h2>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-center items-center gap-16">
      <div className="h-1/2 w-full flex flex-col justify-center items-center">
        <DashboardCard />
      </div>
      <div className="flex justify-center items-center gap-8">
        <PatientCard count={data.hospital.patients.length} />
        <DoctorCard count={data.hospital.doctors.length} />
        <SensorCard count={data.hospital.sensors.length} />
      </div>
    </div>
  );
};

export default HospitalDashboardPage;
