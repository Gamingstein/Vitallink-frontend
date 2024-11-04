"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useQuery, gql } from "@apollo/client";

const GET_PATIENT = gql`
  query ExampleQuery($patientId: ID!) {
    patient(id: $patientId) {
      id
      name
      aadhaar
      admitted
      age
      gender
      doctors {
        gender
        specification
        user {
          name
        }
      }
      hospital {
        user {
          name
        }
      }
    }
  }
`;

export default function InfoCard({ id }: { id: string }) {
  const { data, loading, error } = useQuery(GET_PATIENT, {
    variables: { patientId: id },
  });
  return (
    <div className="">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <Card className="bg-muted w-96">
          <CardHeader>
            <CardTitle className="font-bold">Patients Info</CardTitle>
            <CardDescription>Personal Details</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold">Name: {data.patient.name}</p>
            <p>Age: {data.patient.age}</p>
            <p>Gender: {data.patient.gender}</p>
          </CardContent>
          <CardFooter>
            <p>{data.patient.doctors[0].specification}</p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
