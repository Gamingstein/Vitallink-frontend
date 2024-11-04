import InfoCard from "@/components/cards/InfoCard";

export default async function PatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mt-16 h-full flex justify-center items-center">
      <InfoCard id={id} />
    </div>
  );
}
