"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddSensorDialog } from "../dialogs/AddSensorDialog";

export default function SensorCard({
  count,
  refetchAction,
}: {
  count: number;
  refetchAction: () => void;
}) {
  return (
    <Card className="bg-muted w-96">
      <CardHeader>
        <CardTitle>Sensors</CardTitle>
        <CardDescription>Number of sensors</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-center text-7xl font-bold font-number">{count}</h1>
      </CardContent>
      <CardFooter className="flex justify-end">
        <AddSensorDialog refetchParentAction={refetchAction} />
      </CardFooter>
    </Card>
  );
}
