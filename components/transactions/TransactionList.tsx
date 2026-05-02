// components/transactions/TransactionList.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { ITransaction } from '@/types'
import { formatCurrency, formatDate } from '@/lib/utils/formatCurrency'

export default function TransactionList() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchTransactions() {
    const res = await fetch('/api/transactions')
    const data = await res.json()
    setTransactions(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' })
    setTransactions(prev => prev.filter(t => t._id !== id))
    router.refresh()
  }

  useEffect(() => { fetchTransactions() }, [])

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Recent Transactions</CardTitle></CardHeader>
      <CardContent>
        {loading && <p className="text-center text-gray-400 py-8">Loading...</p>}
        {!loading && !transactions.length && (
          <p className="text-center text-gray-400 py-8">No transactions yet. Add one!</p>
        )}
        <div className="space-y-3">
          {transactions.map(t => (
            <div key={t._id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs capitalize">{t.category}</Badge>
                    <span className="text-xs text-gray-400">{formatDate(t.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500"
                  onClick={() => handleDelete(t._id)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}