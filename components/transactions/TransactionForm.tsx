
// "use client"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { toast } from "sonner"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// const CATEGORIES = ["food","transport","shopping","bills","health","entertainment","salary","freelance","investment","other"]

// export default function TransactionForm() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(false)
//   const [type, setType] = useState("expense")
//   const [category, setCategory] = useState("")

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setLoading(true)

//     const form = new FormData(e.currentTarget)

//     const res = await fetch("/api/transactions", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         type,
//         category,
//         amount: parseFloat(form.get("amount") as string),
//         description: form.get("description"),
//         date: form.get("date"),
//         tags: [],
//       }),
//     })

//     if (!res.ok) {
//       const data = await res.json()
//       toast.error(data.error || "Failed to add transaction")
//       setLoading(false)
//       return
//     }

//     toast.success("Transaction added!")
//     ;(e.target as HTMLFormElement).reset()
//     setCategory("")
//     setLoading(false)
//     router.refresh()
//   }

//   return (
//     <Card>
//       <CardHeader><CardTitle className="text-base">Add Transaction</CardTitle></CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex rounded-lg border overflow-hidden">
//             {["expense","income"].map(t => (
//               <button key={t} type="button" onClick={() => setType(t)}
//                 className={`flex-1 py-2 text-sm capitalize transition-colors ${type === t ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
//                 {t}
//               </button>
//             ))}
//           </div>
//           <div className="space-y-1">
//             <Label>Amount</Label>
//             <Input name="amount" type="number" step="0.01" placeholder="0.00" required />
//           </div>
//           <div className="space-y-1">
//             <Label>Category</Label>
//             <Select onValueChange={setCategory} value={category} required>
//               <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
//               <SelectContent>
//                 {CATEGORIES.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-1">
//             <Label>Description</Label>
//             <Input name="description" placeholder="e.g. Grocery run" required />
//           </div>
//           <div className="space-y-1">
//             <Label>Date</Label>
//             <Input name="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
//           </div>
//           <Button type="submit" className="w-full" disabled={loading || !category}>
//             {loading ? "Adding..." : "Add Transaction"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }


























"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils/formatCurrency"

const CATEGORIES = ["food","transport","shopping","bills","health","entertainment","salary","freelance","investment","other"]

export default function TransactionForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState("expense")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [availableBalance, setAvailableBalance] = useState<number | null>(null)

  async function fetchBalance() {
    const res = await fetch("/api/investments")
    const data = await res.json()
    setAvailableBalance(data.availableBalance ?? null)
  }

  useEffect(() => { fetchBalance() }, [])

  const amountNum = parseFloat(amount) || 0
  const exceedsBalance = type === "expense" && availableBalance !== null && amountNum > availableBalance

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (exceedsBalance) {
      toast.error(`Insufficient balance. Available: ${formatCurrency(availableBalance!)}`)
      return
    }
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        category,
        amount: amountNum,
        description: form.get("description"),
        date: form.get("date"),
        tags: [],
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      toast.error(data.error || "Failed to add transaction")
      setLoading(false)
      return
    }

    toast.success("Transaction added!")
    ;(e.target as HTMLFormElement).reset()
    setCategory("")
    setAmount("")
    setLoading(false)
    fetchBalance()
    router.refresh()
  }

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Add Transaction</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Type toggle */}
          <div className="flex rounded-lg border overflow-hidden">
            {["expense","income"].map(t => (
              <button key={t} type="button" onClick={() => setType(t)}
                className={`flex-1 py-2 text-sm capitalize transition-colors ${type === t ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Balance hint for expenses */}
          {type === "expense" && availableBalance !== null && (
            <div className={`rounded-lg px-3 py-2 flex items-center justify-between text-xs ${availableBalance <= 0 ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"}`}>
              <span className="text-gray-500">Available balance</span>
              <span className={`font-semibold ${availableBalance <= 0 ? "text-red-600" : "text-green-700"}`}>
                {formatCurrency(availableBalance)}
              </span>
            </div>
          )}

          <div className="space-y-1">
            <Label>Amount</Label>
            <Input
              name="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className={exceedsBalance && amount ? "border-red-400 focus-visible:ring-red-400" : ""}
              required
            />
            {exceedsBalance && amount && (
              <p className="text-xs text-red-500">
                Exceeds available balance ({formatCurrency(availableBalance!)})
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label>Category</Label>
            <Select onValueChange={setCategory} value={category} required>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Input name="description" placeholder="e.g. Grocery run" required />
          </div>

          <div className="space-y-1">
            <Label>Date</Label>
            <Input name="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !category || !amount || exceedsBalance}>
            {loading ? "Adding..." : "Add Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
