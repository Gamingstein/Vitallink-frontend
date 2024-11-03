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
import { ComboboxDemo } from "../comboboxes/comboboxdemo";

export function AddPatientDialog() {
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
        <div className="flex flex-col justify-center items-start gap-4 py-4">
          <div className="flex items-center justify-between gap-4 w-full">
            <Label htmlFor="hospital" className="text-right">
              Hospital
            </Label>
            <ComboboxDemo />
          </div>
          <div className="flex items-center justify-between gap-4 w-full">
            <Label htmlFor="patient" className="text-right">
              Patient
            </Label>
            <Input id="patient" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Assign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
