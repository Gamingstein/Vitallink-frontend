"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientCard({ count }: { count: number }) {
  const router = useRouter();
  return (
    <Card className="bg-muted w-96">
      <CardHeader>
        <CardTitle>Patients</CardTitle>
        <CardDescription>Number of Admitted patients</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-7xl font-bold text-center font-number">{count}</h1>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant={"outline"}
          onClick={() => {
            router.push("/dashboard/patients");
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
