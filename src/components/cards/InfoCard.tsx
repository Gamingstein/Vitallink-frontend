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
import { getFullAnalysis, PatientData } from "@/lib/analyzer";
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { VitalChart } from "../charts/vitalChart";
import { AnalysisChart } from "../charts/analysisChart";
import { Skeleton } from "../ui/skeleton";

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

const chartData = [
  {
    time: "2025-05-01T04:00:00Z",
    heartrate: 78,
    spo2: 98,
    temperature: 99.5,
  },
  {
    time: "2025-05-01T04:05:00Z",
    heartrate: 80,
    spo2: 97,
    temperature: 99.6,
  },
  {
    time: "2025-05-01T04:10:00Z",
    heartrate: 76,
    spo2: 99,
    temperature: 99.7,
  },
  {
    time: "2025-05-01T04:15:00Z",
    heartrate: 82,
    spo2: 98,
    temperature: 99.8,
  },
  {
    time: "2025-05-01T04:20:00Z",
    heartrate: 79,
    spo2: 97,
    temperature: 99.9,
  },
  {
    time: "2025-05-01T04:25:00Z",
    heartrate: 77,
    spo2: 98,
    temperature: 100.0,
  },
  {
    time: "2025-05-01T04:30:00Z",
    heartrate: 81,
    spo2: 99,
    temperature: 100.1,
  },
  {
    time: "2025-05-01T04:35:00Z",
    heartrate: 80,
    spo2: 98,
    temperature: 100.2,
  },
  {
    time: "2025-05-01T04:40:00Z",
    heartrate: 78,
    spo2: 97,
    temperature: 100.3,
  },
  {
    time: "2025-05-01T04:45:00Z",
    heartrate: 79,
    spo2: 98,
    temperature: 100.4,
  },
  {
    time: "2025-05-01T04:50:00Z",
    heartrate: 80,
    spo2: 99,
    temperature: 100.5,
  },
  {
    time: "2025-05-01T04:55:00Z",
    heartrate: 77,
    spo2: 98,
    temperature: 100.6,
  },
  {
    time: "2025-05-01T05:00:00Z",
    heartrate: 78,
    spo2: 97,
    temperature: 100.7,
  },
];

export default function InfoCard({ id }: { id: string }) {
  const { data, loading, error } = useQuery(GET_PATIENT, {
    variables: { patientId: id },
  });

  const [result, setResult] = useState<{
    radarData: {
      cardiovascular_stress_index: number | string;
      oxygen_efficiency_score: number | string;
      thermoregulation_index: number | string;
      vital_sign_stability_score: number | string;
      deviation_from_baseline: number | string;
      fatigue_recovery_score: number | string;
      metabolic_activity_proxy: number | string;
    };
    summary: string;
  } | null>(null);

  useEffect(() => {
    if (data) {
      const patientData: PatientData = {
        name: data.patient.name || "",
        age: data.patient.age || "",
        gender: data.patient.gender || "",
        height: "178",
        weight: "68",
        data: chartData,
      };

      getFullAnalysis(patientData)
        .then((res) => {
          console.log(JSON.parse(res.split("```")[1].slice(4)));
          setResult(JSON.parse(res.split("```")[1].slice(4)));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center mx-12 h-full flex-1 p-2">
      {(loading || !result) && (
        <div className="w-full h-full gap-8 flex flex-col justify-center items-center py-2">
          <div className="h-123 w-full flex justify-between">
            <Skeleton className="w-165.5 h-full rounded-3xl" />
            <Skeleton className="w-140.5 h-full rounded-3xl" />
            <Skeleton className="w-92.5 h-full rounded-3xl" />
          </div>
          <div className="h-106 w-full">
            <Skeleton className="w-full h-full rounded-3xl" />
          </div>
        </div>
      )}
      {error && <p className="text-red-400">Error: {error.message}</p>}
      {data && result && (
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <Card className="bg-muted rounded-3xl p-6 w-fit">
              <CardHeader>
                <CardTitle className="font-bold text-2xl">
                  Patients Info
                </CardTitle>
                <CardDescription className="text-lg">
                  Personal Details
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex mx-6">
                <div className="size-64 overflow-hidden relative">
                  <div className="w-lg absolute left-[-60%] ">
                    <DotLottieReact
                      src={
                        data.patient.gender === "MALE"
                          ? "/assets/male.json"
                          : "/assets/female.json"
                      }
                      loop
                      autoplay
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center flex-1 p-2 gap-2">
                  <p className="font-bold text-xl">Name: {data.patient.name}</p>
                  <p className="text-xl">Age: {data.patient.age}</p>
                  <p className="text-xl">Gender: {data.patient.gender}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <summary>
                  {data.patient.doctors.length === 0
                    ? "No Doctor Assigned."
                    : `This patient is assigned a doctor with specialization in ${data.patient.doctors[0]?.specification.charAt(0).toUpperCase()}${data.patient.doctors[0]?.specification.slice(1).toLowerCase()}.`}
                </summary>
                <summary>{`This patient is currently under medical care at ${data.patient.hospital.user.name}.`}</summary>
              </CardFooter>
            </Card>
            <VitalChart data={chartData} />
            {result ? (
              <AnalysisChart data={result.radarData} />
            ) : (
              <Skeleton className="rounded-3xl w-96 h-auto" />
            )}
          </div>
          <div className="bg-muted p-12 rounded-3xl w-full">
            {result ? (
              <>
                <div className="text-2xl font-bold">Analysis Result:</div>
                <div className="mt-2 text-lg font-semibold text-foreground text-justify h-72 p-8 overflow-scroll">
                  <code>{result.summary}</code>
                </div>
              </>
            ) : (
              <div className="text-3xl font-sans font-bold text-foreground animate-pulse h-82 flex flex-col justify-center items-center">
                <span>Analysing Vitals...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
