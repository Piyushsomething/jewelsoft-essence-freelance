
import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="border border-border rounded-md overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-square relative overflow-hidden bg-muted">
        <Skeleton className="h-full w-full" />
      </div>
      
      {/* Content Skeletons */}
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-5 w-3/4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/5" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
