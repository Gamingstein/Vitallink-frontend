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
import { gql, useQuery } from "@apollo/client";
import { addDoctorToHospital } from "@/app/actions/hospital";
import { DialogLoader } from "../loaders/DialogLoader";

type Doctor = {
  id: string;
  specification: string;
  user: {
    name: string;
  };
};

const GET_DOCTORS = gql`
  query Doctors {
    doctors {
      id
      specification
      user {
        name
      }
    }
  }
`;

export function AddDoctorDialog({
  refetchParentAction,
}: {
  refetchParentAction: () => void;
}) {
  const { data, loading, error } = useQuery(GET_DOCTORS);
  const doctors = data?.doctors as Doctor[];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { doctorID: value };
    const res = await addDoctorToHospital({ payload });
    if (res.success) {
      toast.success("Doctor added successfully!", {
        description: `Dr.${doctors.filter((doctor: Doctor) => doctor.id == value)[0].user.name} is added to the hospital.`,
      });
    } else {
      toast.error("Failed to add doctor!", {
        description: `Dr.${doctors.filter((doctor: Doctor) => doctor.id == value)[0].user.name} doctor is not added to the hospital.`,
      });
    }
    setTimeout(() => {
      refetchParentAction();
    }, 500);
  }

  if (loading) {
    return <DialogLoader />;
  }
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Doctor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add doctor</DialogTitle>
          <DialogDescription>
            Search for a doctor to add to the hospital.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center items-start gap-4 py-4">
            <div className="flex items-center justify-between gap-4 w-full">
              <Label htmlFor="doctorID" className="text-right">
                Doctor
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
                      ? doctors.find((doctor: Doctor) => doctor.id === value)
                          ?.user.name
                      : "Select doctor..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search doctor..." />
                    <CommandList>
                      <CommandEmpty>No doctor found.</CommandEmpty>
                      <CommandGroup>
                        {doctors.map((doctor: Doctor) => (
                          <CommandItem
                            key={doctor.id}
                            value={doctor.id}
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
                                value === doctor.id
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {doctor.user.name}
                            <br />➜
                            {doctor.specification.charAt(0).toUpperCase() +
                              doctor.specification.slice(1).toLowerCase()}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="submit">
                Add
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
