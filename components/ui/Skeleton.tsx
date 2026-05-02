// components/ui/Skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} />
  )
}

export function TransactionSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border p-6 space-y-3">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-32" />
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-48 w-full" />
    </div>
  )
}