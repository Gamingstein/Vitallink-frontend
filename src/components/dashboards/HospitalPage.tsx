"use client";
import DoctorCard from "@/components/cards/DoctorCard";
import PatientCard from "@/components/cards/PatientCard";
import { useUserStore } from "@/store/user";
import { useQuery, gql } from "@apollo/client";

const GET_HOSPITAL = gql`
  query Hospital($hospitalId: ID!) {
    hospital(id: $hospitalId) {
      patients {
        id
      }
      doctors {
        id
      }
    }
  }
`;

const HospitalDashboardPage = () => {
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useQuery(GET_HOSPITAL, {
    variables: { hospitalId: user.hospital?.id },
  });
  if (loading) {
    return (
      <div className="h-full flex justify-center items-center pt-16 gap-8">
        <h1 className="text-6xl font-bold">Please wait!</h1>
        <h2 className="text-3xl text-muted-foreground">
          While we are fetching data
        </h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-full flex justify-center items-center pt-16 gap-8">
        <h1 className="text-6xl font-bold">Oops!</h1>
        <h2 className="text-3xl text-muted-foreground">
          Error in fetching data
        </h2>
      </div>
    );
  }

  return (
    <div className="h-full flex justify-center items-center pt-16 gap-8">
      <PatientCard count={data.hospital.patients.length} />
      <DoctorCard count={data.hospital.doctors.length} />
    </div>
  );
};

export default HospitalDashboardPage;
