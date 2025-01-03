"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RegisterPatientDialog } from "../dialogs/RegisterPatientDialog";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { dischargePatient, removePatient } from "@/app/actions/patient";
import { AssignDoctorDialog } from "../dialogs/AssignDoctorDialog";

type Doctor = {
  id: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  specification: string;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  aadhaar: string;
  admitted: boolean;
  doctors: Doctor[];
};

export function getColumns(refetchParent: () => void): ColumnDef<Patient>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <div className="capitalize">
          {(row.getValue("gender") as string).charAt(0).toUpperCase() +
            (row.getValue("gender") as string).slice(1).toLowerCase()}
        </div>
      ),
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("age")}</div>
      ),
    },
    {
      accessorKey: "aadhaar",
      header: "Aadhaar",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("aadhaar")}</div>
      ),
    },
    {
      accessorKey: "admitted",
      header: "Admitted",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("admitted") ? "Yes" : "No"}
        </div>
      ),
    },
    {
      id: "assignedDoctor",
      header: "Assigned Doctor",
      enableHiding: false,
      cell: ({ row }) => {
        const patient = row.original;
        return (
          <div className="capitalize">
            {patient.doctors.length == 0 ? (
              <AssignDoctorDialog
                refetchParentAction={refetchParent}
                patientId={patient.id}
              />
            ) : (
              <span>Dr. {patient.doctors[0]?.user.name}</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const patient = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(patient.id)}
              >
                Copy patient ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  redirect(`/dashboard/patient/${patient.id}`);
                }}
              >
                View patient report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  const payload = { patientID: patient.id };
                  const res = await dischargePatient({ payload });
                  if (res.success) {
                    toast.success("Patient discharged successfully", {
                      description: `${patient.name} has been removed from the hospital`,
                    });
                  } else {
                    toast.error("Failed to discharge patient");
                  }
                  setTimeout(() => {
                    refetchParent();
                  }, 500);
                }}
              >
                Discharge patient
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  const payload = { patientID: patient.id };
                  const res = await removePatient({ payload });
                  if (res.success) {
                    toast.success("Patient removed successfully", {
                      description: `${patient.name} has been removed from the hospital`,
                    });
                  } else {
                    toast.error("Failed to remove patient");
                  }
                  setTimeout(() => {
                    refetchParent();
                  }, 500);
                }}
              >
                Remove patient
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export function PatientTable({
  data,
  refetchAction,
}: {
  data: Patient[];
  refetchAction: () => void;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = getColumns(refetchAction);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full px-36">
      <div className="flex items-center py-4 gap-8">
        <Input
          placeholder="Search name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Search aadhaar..."
          value={(table.getColumn("aadhaar")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("aadhaar")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <RegisterPatientDialog />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
