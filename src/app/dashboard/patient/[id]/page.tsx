import InfoCard from "@/components/cards/InfoCard";
import { Skeleton } from "@/components/ui/skeleton";

export default async function PatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="pt-32 h-full flex justify-center items-start">
      <InfoCard id={id} />
    </div>
  );
}
