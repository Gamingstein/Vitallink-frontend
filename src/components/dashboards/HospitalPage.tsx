"use client";
import { useQuery, gql } from "@apollo/client";
import { PatientTable } from "../tables/PatientTable";
import { useUserStore } from "@/store/user";

const GET_PATIENTS_BY_HOSPITAL = gql`
  query Patientsbyhospital($patientsbyhospitalId: ID!) {
    patientsbyhospital(id: $patientsbyhospitalId) {
      id
      name
      age
      gender
      aadhaar
      admitted
    }
  }
`;

const HospitalDashboardPage = () => {
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useQuery(GET_PATIENTS_BY_HOSPITAL, {
    variables: { patientsbyhospitalId: user.hospital?.id },
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
    console.log(data.patientsbyhospital);
  }
  return (
    <div className="h-full flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold py-8">Hospital&apos;s Patients</h1>
      <PatientTable data={data.patientsbyhospital} />
    </div>
  );
};

export default HospitalDashboardPage;
