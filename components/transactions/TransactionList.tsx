
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { ITransaction } from "@/types"
import { formatCurrency, formatDate } from "@/lib/utils/formatCurrency"
import { TransactionSkeleton } from "@/components/ui/Skeleton"

export default function TransactionList() {
  const router = useRouter()
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function fetchTransactions() {
    setLoading(true)
    const res = await fetch("/api/transactions")
    const data = await res.json()
    setTransactions(data)
    setLoading(false)
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    const res = await fetch(`/api/transactions?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      setTransactions(prev => prev.filter(t => t._id !== id))
      toast.success("Transaction deleted")
      router.refresh()
    } else {
      toast.error("Failed to delete transaction")
    }
    setDeletingId(null)
  }

  useEffect(() => { fetchTransactions() }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          Recent Transactions
          <span className="text-sm font-normal text-gray-400">{transactions.length} total</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <TransactionSkeleton />}
        {!loading && !transactions.length && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">💸</p>
            <p className="font-medium">No transactions yet</p>
            <p className="text-sm mt-1">Add your first one using the form</p>
          </div>
        )}
        <div className="space-y-3">
          {transactions.map(t => (
            <div key={t._id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.type === "income" ? "bg-green-500" : "bg-red-400"}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{t.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs capitalize">{t.category}</Badge>
                    <span className="text-xs text-gray-400">{formatDate(t.date)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-semibold text-sm ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500"
                  disabled={deletingId === t._id}
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
