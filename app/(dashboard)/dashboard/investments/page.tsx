
"use client"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, TrendingUp, TrendingDown, Pencil, Check, X, Wallet } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils/formatCurrency"

const CATEGORIES = ["stocks","crypto","real-estate","gold","mutual-funds","savings","business","other"]

const CATEGORY_COLORS: Record<string, string> = {
  stocks: "bg-blue-50 text-blue-700 border-blue-200",
  crypto: "bg-orange-50 text-orange-700 border-orange-200",
  "real-estate": "bg-green-50 text-green-700 border-green-200",
  gold: "bg-yellow-50 text-yellow-700 border-yellow-200",
  "mutual-funds": "bg-purple-50 text-purple-700 border-purple-200",
  savings: "bg-teal-50 text-teal-700 border-teal-200",
  business: "bg-pink-50 text-pink-700 border-pink-200",
  other: "bg-gray-50 text-gray-700 border-gray-200",
}

interface Investment {
  _id: string
  name: string
  category: string
  amountInvested: number
  currentValue: number
  date: Date
  notes: string
}

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [availableBalance, setAvailableBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [category, setCategory] = useState("")
  const [amountInput, setAmountInput] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function fetchData() {
    setLoading(true)
    const res = await fetch("/api/investments")
    const data = await res.json()
    setInvestments(data.investments || [])
    setAvailableBalance(data.availableBalance || 0)
    setLoading(false)
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)

    const amount = parseFloat(amountInput)

    if (amount > availableBalance) {
      toast.error(`Insufficient balance. Available: ${formatCurrency(availableBalance)}`)
      setSaving(false)
      return
    }

    const form = new FormData(e.currentTarget)
    const res = await fetch("/api/investments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        category,
        amountInvested: amount,
        date: form.get("date"),
        notes: form.get("notes") || "",
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      toast.error(data.error || "Failed to add investment")
      setSaving(false)
      return
    }

    toast.success("Investment added!")
    ;(e.target as HTMLFormElement).reset()
    setCategory("")
    setAmountInput("")
    fetchData()
    setSaving(false)
  }

  async function handleUpdateValue(id: string) {
    const res = await fetch("/api/investments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, currentValue: parseFloat(editValue) }),
    })
    if (res.ok) {
      toast.success("Value updated!")
      setEditingId(null)
      fetchData()
    } else {
      toast.error("Failed to update")
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    const res = await fetch(`/api/investments?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Investment removed")
      fetchData()
    } else {
      toast.error("Failed to delete")
    }
    setDeletingId(null)
  }

  useEffect(() => { fetchData() }, [])

  const totalInvested = investments.reduce((s, i) => s + i.amountInvested, 0)
  const totalCurrent = investments.reduce((s, i) => s + i.currentValue, 0)
  const totalPnL = totalCurrent - totalInvested
  const totalPnLPct = totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(1) : "0"

  const categoryMap: Record<string, number> = {}
  investments.forEach(i => {
    categoryMap[i.category] = (categoryMap[i.category] || 0) + i.currentValue
  })

  const amountNum = parseFloat(amountInput) || 0
  const exceedsBalance = amountNum > availableBalance

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Investments</h2>
      <p className="text-sm text-gray-500 mb-6">Invest from your available balance. Current value updates automatically to your invested amount and can be edited later.</p>

      {/* Balance + Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        {/* Available balance — most prominent */}
        <Card className="border-2 border-gray-900 bg-gray-900 text-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-1">
              <Wallet size={15} className="text-gray-400" />
              <p className="text-sm text-gray-400">Available to Invest</p>
            </div>
            <p className="text-2xl font-bold">
              {loading ? "—" : formatCurrency(availableBalance)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Balance after expenses &amp; investments</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 mb-1">Total Invested</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvested)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 mb-1">Portfolio Value</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCurrent)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500 mb-1">Overall P&amp;L</p>
            <div className="flex items-center gap-2">
              <p className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-600" : "text-red-500"}`}>
                {totalPnL >= 0 ? "+" : ""}{formatCurrency(totalPnL)}
              </p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${totalPnL >= 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                {totalPnL >= 0 ? "+" : ""}{totalPnLPct}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Add form */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">New Investment</CardTitle></CardHeader>
            <CardContent>

              {/* Balance reminder inside form */}
              <div className={`rounded-lg px-3 py-2.5 mb-4 flex items-center justify-between ${availableBalance <= 0 ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"}`}>
                <span className="text-xs text-gray-600">Available balance</span>
                <span className={`text-sm font-bold ${availableBalance <= 0 ? "text-red-600" : "text-green-700"}`}>
                  {formatCurrency(availableBalance)}
                </span>
              </div>

              {availableBalance <= 0 ? (
                <div className="text-center py-4 text-gray-400">
                  <p className="text-sm">No balance available to invest.</p>
                  <p className="text-xs mt-1">Add income transactions first.</p>
                </div>
              ) : (
                <form onSubmit={handleAdd} className="space-y-3">
                  <div className="space-y-1">
                    <Label>Asset name</Label>
                    <Input name="name" placeholder="e.g. Bitcoin, Apple Stock" required />
                  </div>
                  <div className="space-y-1">
                    <Label>Category</Label>
                    <Select onValueChange={setCategory} value={category}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(c => (
                          <SelectItem key={c} value={c} className="capitalize">
                            {c.replace("-", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Amount to invest</Label>
                    <Input
                      name="amountInvested"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amountInput}
                      onChange={e => setAmountInput(e.target.value)}
                      className={exceedsBalance && amountInput ? "border-red-400 focus-visible:ring-red-400" : ""}
                      required
                    />
                    {exceedsBalance && amountInput && (
                      <p className="text-xs text-red-500">
                        Exceeds available balance ({formatCurrency(availableBalance)})
                      </p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label>Date</Label>
                    <Input name="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
                  </div>
                  <div className="space-y-1">
                    <Label>Notes (optional)</Label>
                    <Input name="notes" placeholder="Any notes..." />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={saving || !category || !amountInput || exceedsBalance}>
                    {saving ? "Investing..." : "Invest"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Portfolio breakdown */}
          {Object.keys(categoryMap).length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-base">Portfolio Breakdown</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(categoryMap)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, val]) => {
                    const pct = totalCurrent > 0 ? (val / totalCurrent) * 100 : 0
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize text-gray-600 text-xs">{cat.replace("-", " ")}</span>
                          <span className="text-gray-400 text-xs">{pct.toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-900 rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Investment list */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                Your Portfolio
                <span className="text-sm font-normal text-gray-400">{investments.length} assets</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <p className="text-center text-gray-400 py-8">Loading...</p>}
              {!loading && !investments.length && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-3">📈</p>
                  <p className="font-medium">No investments yet</p>
                  <p className="text-sm mt-1">Start investing from your available balance</p>
                </div>
              )}
              <div className="space-y-3">
                {investments.map(inv => {
                  const pnl = inv.currentValue - inv.amountInvested
                  const pnlPct = inv.amountInvested > 0 ? ((pnl / inv.amountInvested) * 100).toFixed(1) : "0"
                  const isProfit = pnl >= 0

                  return (
                    <div key={inv._id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-gray-900">{inv.name}</p>
                            <Badge className={`text-xs capitalize border ${CATEGORY_COLORS[inv.category]}`} variant="outline">
                              {inv.category.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-400 mb-3">{formatDate(inv.date)}</p>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs text-gray-400 mb-0.5">Invested</p>
                              <p className="text-sm font-medium text-gray-700">{formatCurrency(inv.amountInvested)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-0.5">Current value</p>
                              {editingId === inv._id ? (
                                <div className="flex items-center gap-1">
                                  <Input
                                    className="h-7 text-xs px-2 w-24"
                                    value={editValue}
                                    onChange={e => setEditValue(e.target.value)}
                                    type="number"
                                    step="0.01"
                                  />
                                  <button onClick={() => handleUpdateValue(inv._id)} className="text-green-600 hover:text-green-700">
                                    <Check size={14} />
                                  </button>
                                  <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600">
                                    <X size={14} />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <p className="text-sm font-medium text-gray-700">{formatCurrency(inv.currentValue)}</p>
                                  <button
                                    onClick={() => { setEditingId(inv._id); setEditValue(String(inv.currentValue)) }}
                                    className="text-gray-300 hover:text-gray-500 transition-colors"
                                    title="Update current value">
                                    <Pencil size={11} />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-0.5">P&amp;L</p>
                              <div className="flex items-center gap-1">
                                {isProfit
                                  ? <TrendingUp size={13} className="text-green-500" />
                                  : <TrendingDown size={13} className="text-red-500" />}
                                <p className={`text-sm font-semibold ${isProfit ? "text-green-600" : "text-red-500"}`}>
                                  {isProfit ? "+" : ""}{formatCurrency(pnl)} ({pnlPct}%)
                                </p>
                              </div>
                            </div>
                          </div>

                          {inv.notes && (
                            <p className="text-xs text-gray-400 mt-2 italic">{inv.notes}</p>
                          )}
                        </div>

                        <Button
                          variant="ghost" size="icon"
                          className="h-8 w-8 text-gray-300 hover:text-red-500 ml-2 flex-shrink-0"
                          disabled={deletingId === inv._id}
                          onClick={() => handleDelete(inv._id)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
