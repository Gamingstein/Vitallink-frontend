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

export function AddSensorDialog() {
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
        <div className="flex flex-col justify-center items-start gap-4 py-4">
          <div className="flex items-center justify-between gap-4 w-full">
            <Label htmlFor="macAddress" className="text-right">
              MAC Address
            </Label>
            <Input id="macAddress" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
