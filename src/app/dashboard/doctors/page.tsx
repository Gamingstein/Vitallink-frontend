"use client";
import { useQuery, gql } from "@apollo/client";
import { useUserStore } from "@/store/user";
import { DoctorTable } from "@/components/tables/DoctorTable";
import { DoctorTableLoader } from "@/components/loaders/TableLoader";

const GET_DOCTORS_BY_HOSPITAL = gql`
  query Doctorsbyhospital($doctorsbyhospitalId: ID!) {
    doctorsbyhospital(id: $doctorsbyhospitalId) {
      id
      gender
      specification
      user {
        id
        name
        email
        username
      }
    }
  }
`;

const HospitalPatientPage = () => {
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useQuery(GET_DOCTORS_BY_HOSPITAL, {
    variables: { doctorsbyhospitalId: user.hospital?.id },
  });
  if (loading) {
    return (
      <div className="h-full flex flex-col justify-start items-center pt-16">
        <DoctorTableLoader />
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
    console.log(data.doctorsbyhospital);
  }
  return (
    <div className="h-full flex flex-col justify-start items-center pt-16">
      <DoctorTable data={data.doctorsbyhospital} />
    </div>
  );
};

export default HospitalPatientPage;
