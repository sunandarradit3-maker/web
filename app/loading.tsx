import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="container-page py-10 space-y-6">
      <Skeleton className="h-44 w-full rounded-3xl shimmer" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40 rounded-3xl shimmer" />
        <Skeleton className="h-40 rounded-3xl shimmer" />
        <Skeleton className="h-40 rounded-3xl shimmer" />
      </div>
    </div>
  );
}
