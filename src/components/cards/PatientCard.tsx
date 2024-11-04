import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function PatientCard() {
  return (
    <Card className="bg-muted w-96">
      <CardHeader>
        <CardTitle>Patients</CardTitle>
        <CardDescription>Number of Admitted patients</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-7xl font-bold text-center">100</h1>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant={"outline"}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}