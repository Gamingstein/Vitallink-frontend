"use client";
import { useUserStore } from "@/store/user";
import { useQuery, gql } from "@apollo/client";
import { PatientTable } from "../tables/PatientTable";

const GET_PATIENTS_BY_DOCTOR = gql`
  query Patientsbydoctor($patientsbydoctorId: ID!) {
    patientsbydoctor(id: $patientsbydoctorId) {
      id
      name
      age
      gender
      aadhaar
      admitted
    }
  }
`;

const DoctorDashboardPage = () => {
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useQuery(GET_PATIENTS_BY_DOCTOR, {
    variables: { patientsbydoctorId: user.doctor?.id },
  });
  if (loading) {
    return (
      <div className="h-full flex flex-col justify-center items-center pt-16 gap-8">
        <h1 className="text-6xl font-bold">Please wait!</h1>
        <h2 className="text-3xl text-muted-foreground">
          While we are fetching data
        </h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="h-full flex flex-col justify-center items-center pt-16 gap-8">
        <h1 className="text-6xl font-bold">Oops!</h1>
        <h2 className="text-3xl text-muted-foreground">
          Error in fetching data
        </h2>
      </div>
    );
  } else {
    console.log(data.patientsbydoctor);
  }
  return (
    <div className="h-full flex justify-center items-start pt-16">
      <PatientTable data={data.patientsbydoctor} />
    </div>
  );
};

export default DoctorDashboardPage;
