"use client";
import { addSensorToHospital } from "@/app/actions/hospital";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddSensorDialog({
  refetchParentAction,
}: {
  refetchParentAction: () => void;
}) {
  const [value, setValue] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { macAddress: value };
    const res = await addSensorToHospital({ payload });
    if (res.success) {
      toast.success("Sensor added successfully!", {
        description: `Sensor with MAC address:${value} is added to the network.`,
      });
    } else {
      toast.error("Failed to add sensor!", {
        description: `Sensor with MAC address:${value} could not be added to the network.`,
      });
    }
    setTimeout(() => {
      refetchParentAction();
    }, 500);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add sensor</DialogTitle>
          <DialogDescription>
            Add a new sensor to your network by entering its MAC address.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col justify-center items-start gap-4 py-4">
            <div className="flex items-center justify-between gap-4 w-full">
              <Label htmlFor="macAddress" className="text-right">
                MAC Address
              </Label>
              <Input
                id="macAddress"
                value={value}
                onChange={(val) => {
                  setValue(val.target.value);
                }}
              />
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
