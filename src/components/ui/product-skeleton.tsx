// src/components/ui/product-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductSkeletonProps {
  count?: number;
  className?: string;
}

export const ProductSkeleton = ({ count = 4, className }: ProductSkeletonProps) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", className)}>
      {Array(count)
        .fill(null)
        .map((_, idx) => (
          <div key={idx} className="flex flex-col space-y-3">
            <Skeleton className="aspect-square rounded-md bg-gray-200 dark:bg-gray-800">
              <div className="h-full w-full animate-pulse bg-gray-200 dark:bg-gray-800">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent animate-shimmer" />
              </div>
            </Skeleton>
            <div className="space-y-2 px-1">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-5 w-1/4 rounded mt-2" />
            </div>
          </div>
        ))}
    </div>
  );
};