"use client";
import { useUserStore } from "@/store/user";
import { useQuery, gql } from "@apollo/client";
import { PatientTableLoader } from "../loaders/TableLoader";
import { PatientTableD } from "../tables/PatientTableD";

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
    variables: { patientsbydoctorId: user?.doctor?.id },
  });
  if (loading) {
    return (
      <div className="h-full flex justify-center items-start pt-16">
        <PatientTableLoader />
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
    <div className="h-full flex justify-center items-start pt-16">
      <PatientTableD data={data.patientsbydoctor} />
    </div>
  );
};

export default DoctorDashboardPage;
