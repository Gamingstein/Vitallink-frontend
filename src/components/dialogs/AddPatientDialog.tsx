"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { gql, useQuery } from "@apollo/client";
import { addPatientToDoctor } from "@/app/actions/doctor";
import { useUserStore } from "@/store/user";

type Hospital = {
  id: string;
  user: { name: string };
};

const GET_HOSPITALS = gql`
  query Hospitalsbydoctor($hospitalsbydoctorId: ID!) {
    hospitalsbydoctor(id: $hospitalsbydoctorId) {
      id
      user {
        name
      }
    }
  }
`;

export function AddPatientDialog({
  refetchParentAction,
}: {
  refetchParentAction: () => void;
}) {
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useQuery(GET_HOSPITALS, {
    variables: {
      hospitalsbydoctorId: user?.doctor?.id,
    },
  });
  const hospitals = data?.hospitalsbydoctor;
  const [value, setValue] = useState("");
  const [patient, setPatient] = useState("");
  const [open, setOpen] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { aadhaar: patient, hospitalID: value };
    const res = await addPatientToDoctor({ payload });
    if (!res.success) {
      toast.error("Failed to add patient!", {
        description: "An error occurred while adding the patient.",
      });
    } else {
      toast.success("Patient added successfully!", {
        description: `Patient with aadhaar "${patient}" from "${
          hospitals.find((hospital: Hospital) => hospital.id === value)?.user
            .name
        }" has been added to your care.`,
      });
    }
    setTimeout(() => {
      refetchParentAction();
    }, 500);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add patient</DialogTitle>
          <DialogDescription>
            Select a hospital, choose a patient, and click &quot;Assign&quot; to
            add them to your care.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center items-start gap-4 py-4">
            <div className="flex items-center justify-between gap-4 w-full">
              <Label htmlFor="hospitalID" className="text-right">
                Hospital
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {value
                      ? hospitals.find(
                          (hospital: Hospital) => hospital.id === value,
                        )?.user.name
                      : "Select hospital..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search hospital..." />
                    <CommandList>
                      <CommandEmpty>No hospital found.</CommandEmpty>
                      <CommandGroup>
                        {hospitals.map((hospital: Hospital) => (
                          <CommandItem
                            key={hospital.id}
                            value={hospital.id}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === hospital.id
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {hospital.user.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
              <Label htmlFor="patient_aadhaar" className="text-left">
                Patient&apos;s Aadhaar
              </Label>
              <Input
                id="patient_aadhaar"
                value={patient}
                maxLength={12}
                onChange={(val) => setPatient(val.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="submit">
                Assign
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
