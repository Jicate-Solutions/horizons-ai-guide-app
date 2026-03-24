import { cn } from '@/lib/utils';

const Shimmer = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700", className)} />
);

/** Skeleton for a page with hero + cards */
export const PageSkeleton = () => (
  <div className="min-h-screen bg-background">
    <Shimmer className="h-14 w-full rounded-none" />
    <div className="container mx-auto px-4 py-6 space-y-6">
      <Shimmer className="h-48 w-full rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Shimmer className="h-32 rounded-xl" />
        <Shimmer className="h-32 rounded-xl" />
        <Shimmer className="h-32 rounded-xl" />
      </div>
      <Shimmer className="h-64 w-full rounded-xl" />
    </div>
  </div>
);

/** Skeleton for a card list page */
export const CardListSkeleton = () => (
  <div className="container mx-auto px-4 py-6 space-y-4">
    <Shimmer className="h-10 w-64 mb-2" />
    <Shimmer className="h-5 w-96 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="flex gap-4 p-4 border rounded-xl">
          <Shimmer className="w-14 h-14 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-5 w-3/4" />
            <Shimmer className="h-4 w-1/2" />
            <Shimmer className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/** Skeleton for a detail page */
export const DetailSkeleton = () => (
  <div className="container mx-auto px-4 py-6 space-y-6">
    <div className="flex items-center gap-4 mb-6">
      <Shimmer className="w-16 h-16 rounded-xl" />
      <div className="space-y-2 flex-1">
        <Shimmer className="h-6 w-64" />
        <Shimmer className="h-4 w-48" />
      </div>
    </div>
    <Shimmer className="h-40 w-full rounded-xl" />
    <div className="space-y-3">
      <Shimmer className="h-4 w-full" />
      <Shimmer className="h-4 w-5/6" />
      <Shimmer className="h-4 w-4/6" />
    </div>
    <Shimmer className="h-60 w-full rounded-xl" />
  </div>
);

/** Skeleton for dashboard stats */
export const DashboardSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <Shimmer className="h-16 w-full rounded-none" />
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-xl border p-4 space-y-2">
            <Shimmer className="h-3 w-16" />
            <Shimmer className="h-8 w-20" />
          </div>
        ))}
      </div>
      <Shimmer className="h-72 w-full rounded-xl" />
    </div>
  </div>
);

export default Shimmer;
