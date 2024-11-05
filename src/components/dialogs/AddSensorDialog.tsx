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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function AddSensorDialog() {
  const { toast } = useToast();
  const [value, setValue] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //backend call to add sensor
    toast({
      title: "Sensor added successfully!",
      description: `Sensor with MAC address:${value} is added to the network.`,
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Sensor</Button>
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
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
