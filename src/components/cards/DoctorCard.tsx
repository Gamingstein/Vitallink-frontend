"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function DoctorCard() {
  return (
    <Card className="bg-muted w-96">
      <CardHeader>
        <CardTitle>Doctors</CardTitle>
        <CardDescription>Number of doctors</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-center text-7xl font-bold">100</h1>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant={"outline"}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
