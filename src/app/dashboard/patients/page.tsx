"use client";
import { useQuery, gql } from "@apollo/client";
import { useUserStore } from "@/store/user";
import { PatientTable } from "@/components/tables/PatientTable";
import { PatientTableLoader } from "@/components/loaders/TableLoader";

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
        id
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
      <div className="h-full flex flex-col justify-start items-center pt-16">
        <PatientTableLoader />
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
      <PatientTable data={data.patientsbyhospital} refetchAction={refetch} />
    </div>
  );
};

export default HospitalPatientPage;
