import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Page = ({ params }: { params: { id: string } }) => {
  const data = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Doe", age: 26 },
    { id: 3, name: "John Smith", age: 27 },
    { id: 4, name: "Jane Smith", age: 28 },
    { id: 5, name: "John Johnson", age: 29 },
    { id: 6, name: "Jane Johnson", age: 30 },
    { id: 7, name: "John James", age: 31 },
    { id: 8, name: "Jane James", age: 32 },
    { id: 9, name: "John Brown", age: 33 },
    { id: 10, name: "Jane Brown", age: 34 },
  ];
  return (
    <div className="p-32">
      <Table>
        <TableCaption>A list of Patients</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell className="text-right">{row.age}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
