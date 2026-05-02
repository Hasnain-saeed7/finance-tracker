// app/(dashboard)/dashboard/loading.tsx
import { StatCardSkeleton, ChartSkeleton } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
  return (
    <div className="p-8">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
    </div>
  )
}