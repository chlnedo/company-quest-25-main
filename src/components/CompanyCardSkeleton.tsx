import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CompanyCardSkeleton = () => {
  return (
    <Card className="p-6 bg-card border-border/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
      
      <Skeleton className="h-10 w-full mb-4" />
      
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>
  );
};
