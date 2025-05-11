"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-4 mt-16">
      <h2 className="text-2xl">Something went wrong!</h2>
      <Button onClick={() => reset()} variant="secondary">
        Try again
      </Button>
    </div>
  );
}
