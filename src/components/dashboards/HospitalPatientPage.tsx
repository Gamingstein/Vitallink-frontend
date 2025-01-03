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
      doctors {
        user {
          name
        }
      }
    }
  }
`;

const HospitalPatientPage = () => {
  const user = useUserStore((state) => state.user);
  const { data, loading, error, refetch } = useQuery(GET_PATIENTS_BY_HOSPITAL, {
    variables: { patientsbyhospitalId: user?.hospital?.id },
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
      <div className="h-full flex flex-col justify-center items-center pt-16">
        <h1 className="text-9xl font-bold font-number">Oops!!</h1>
        <h1 className="text-7xl font-bold font-display">An Error Occurred!</h1>
        <h2 className="text-3xl text-muted-foreground mt-20">
          {error.message}
        </h2>
      </div>
    );
  } else {
    console.log(data.patientsbyhospital);
  }
  return (
    <div className="h-full flex flex-col justify-start items-center pt-16">
      <PatientTable data={data.patientsbyhospital} refetchAction={refetch} />
    </div>
  );
};

export default HospitalPatientPage;
