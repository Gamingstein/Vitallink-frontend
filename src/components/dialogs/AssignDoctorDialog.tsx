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
import { useToast } from "@/hooks/use-toast";
import { gql, useQuery } from "@apollo/client";
import { useUserStore } from "@/store/user";

type Doctor = {
  id: string;
  user: {
    name: string;
  };
};

const GET_DOCTORS = gql`
  query Doctorsbyhospital($doctorsbyhospitalId: ID!) {
    doctorsbyhospital(id: $doctorsbyhospitalId) {
      id
      user {
        name
      }
    }
  }
`;

export function AssignDoctorDialog() {
  const user = useUserStore((state) => state.user);
  const { data, loading, error } = useQuery(GET_DOCTORS, {
    variables: {
      doctorsbyhospitalId: user.hospital?.id || "671a1c7cb1efa6c38af82b1f",
    },
  });
  const doctors = data?.doctorsbyhospital;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { toast } = useToast();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //backend call to assign doctor
    toast({
      title: "Doctor assigned successfully!",
      description: `Number ${value} doctor is assigned to the patient.`,
    });
  }

  if (loading) {
    console.log(user.hospital?.id);
    return <p>Loading...</p>;
  }
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Assign Doctor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign a doctor</DialogTitle>
          <DialogDescription>
            Search for a doctor to assign to the patient.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
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
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === doctor.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {doctor.user.name}
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
            <Button type="submit">Assign</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
