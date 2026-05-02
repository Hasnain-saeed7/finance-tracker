// app/(dashboard)/transactions/loading.tsx
import { TransactionSkeleton } from '@/components/ui/Skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/Skeleton'

export default function TransactionsLoading() {
  return (
    <div className="p-8">
      <Skeleton className="h-8 w-40 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card><CardContent className="pt-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><Skeleton className="h-5 w-40" /></CardHeader>
            <CardContent><TransactionSkeleton /></CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}