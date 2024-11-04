import InfoCard from "./InfoCard";

export default async function PatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="mt-16">
      <InfoCard id={id} />
    </div>
  );
}
