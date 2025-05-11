import { Skeleton } from "@/components/ui/skeleton";

export function DialogLoader() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-9 w-28 rounded-md inline-flex items-center justify-center">
        Loading...
      </Skeleton>
    </div>
  );
}
