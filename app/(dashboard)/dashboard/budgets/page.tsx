
"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils/formatCurrency"

const CATEGORIES = ["food","transport","shopping","bills","health","entertainment","salary","freelance","investment","other"]

interface Budget {
  _id: string
  category: string
  limit: number
  month: string
  spent: number
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [category, setCategory] = useState("")
  const [limit, setLimit] = useState("")
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))

  async function fetchBudgets() {
    const res = await fetch(`/api/budgets?month=${month}`)
    const data = await res.json()
    setBudgets(data)
    setLoading(false)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, limit: parseFloat(limit), month }),
    })
    setCategory("")
    setLimit("")
    setSaving(false)
    fetchBudgets()
  }

  async function handleDelete(id: string) {
    await fetch(`/api/budgets?id=${id}`, { method: "DELETE" })
    setBudgets(prev => prev.filter(b => b._id !== id))
  }

  useEffect(() => { fetchBudgets() }, [month])

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Budgets</h2>
        <Input type="month" value={month} onChange={e => setMonth(e.target.value)} className="w-full sm:w-40" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add budget form */}
        <Card>
          <CardHeader><CardTitle className="text-base">Set Budget</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-1">
                <Label>Category</Label>
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Monthly limit (Rs.)</Label>
                <Input type="number" step="0.01" placeholder="0.00" value={limit} onChange={e => setLimit(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={saving || !category || !limit}>
                {saving ? "Saving..." : "Set Budget"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Budget list */}
        <div className="lg:col-span-2 space-y-4">
          {loading && <p className="text-center text-gray-400 py-8">Loading...</p>}
          {!loading && !budgets.length && (
            <Card><CardContent className="py-12 text-center text-gray-400">No budgets set for {month}</CardContent></Card>
          )}
          {budgets.map(b => {
            const pct = Math.min((b.spent / b.limit) * 100, 100)
            const over = b.spent > b.limit
            return (
              <Card key={b._id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium capitalize text-gray-900">{b.category}</p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(b.spent)} of {formatCurrency(b.limit)}
                        {over && <span className="text-red-500 ml-2 font-medium">Over budget!</span>}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold ${over ? "text-red-500" : "text-green-600"}`}>
                        {pct.toFixed(0)}%
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500"
                        onClick={() => handleDelete(b._id)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${over ? "bg-red-500" : pct > 80 ? "bg-amber-400" : "bg-green-500"}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
