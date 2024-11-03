"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { registerPatient } from "@/app/actions/patient";

export function RegisterPatientDialog() {
  const [state, action] = useActionState(registerPatient, undefined);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register new patient</DialogTitle>
          <DialogDescription>
            Fill out this form to register a new patient. Enter the
            patient&apos;s details and click &quot;Register&quot; to save their
            information.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="flex flex-col justify-center items-start gap-4 py-4">
            <div className="flex items-center justify-between gap-4 w-full">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" type="text" name="name" />
              {state?.errors?.name && (
                <p className="text-red-500 text-sm">{state.errors.name}</p>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
              <Label htmlFor="age" className="text-right">
                Age
              </Label>
              <Input id="age" type="text" name="age" />
              {state?.errors?.age && (
                <p className="text-red-500 text-sm">{state.errors.age}</p>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
              <Label htmlFor="gender" className="text-right">
                Gender
              </Label>
              <Select name="gender">
                <SelectTrigger className="w-2/3">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {state?.errors?.gender && (
                <p className="text-red-500 text-sm">{state.errors.gender}</p>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
              <Label htmlFor="aadhaar" className="text-right">
                Aadhaar
              </Label>
              <Input id="aadhaar" type="text" maxLength={12} name="aadhaar" />
              {state?.errors?.aadhaar && (
                <p className="text-red-500 text-sm">{state.errors.aadhaar}</p>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
              <Label htmlFor="sensorID" className="text-right">
                Sensor ID
              </Label>
              <Input id="sensorID" type="text" name="sensorID" />
              {state?.errors?.sensorID && (
                <p className="text-red-500 text-sm">{state.errors.sensorID}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Register</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
