import Image from "next/image";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="h-dvh flex flex-col items-center justify-center">
      <Image
        src={"/assets/logo.png"}
        width={800}
        height={800}
        alt="Vitallink Logo"
        className={`object-cover h-24 w-80 dark:saturate-0 dark:contrast-200 dark:brightness-200 animate-pulse`}
      />
    </section>
  );
}
