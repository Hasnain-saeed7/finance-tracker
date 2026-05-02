
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Loader2, RefreshCw } from "lucide-react"

export default function AdvisorPage() {
  const [advice, setAdvice] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [ran, setRan] = useState(false)

  async function fetchAdvice() {
    setLoading(true)
    setAdvice("")
    setError("")
    setRan(true)

    try {
      const res = await fetch("/api/advisor")

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Something went wrong")
        setLoading(false)
        return
      }

      const contentType = res.headers.get("content-type") || ""
      if (contentType.includes("application/json")) {
        const data = await res.json()
        setAdvice(data.advice)
        setLoading(false)
        return
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setAdvice(prev => prev + decoder.decode(value))
      }
    } catch {
      setError("Failed to connect. Check your API key.")
    }

    setLoading(false)
  }

  // Simple markdown-like renderer for the sections
  function renderAdvice(text: string) {
    const sections = text.split(/(?=## )/).filter(Boolean)
    if (sections.length <= 1) {
      return <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">{text}</p>
    }

    return (
      <div className="space-y-5">
        {sections.map((section, i) => {
          const lines = section.split("\n").filter(Boolean)
          const heading = lines[0].replace("## ", "")
          const body = lines.slice(1).join("\n")

          const bgMap: Record<string, string> = {
            "🟢": "bg-green-50 border-green-200",
            "🔴": "bg-red-50 border-red-200",
            "📌": "bg-blue-50 border-blue-200",
            "💼": "bg-purple-50 border-purple-200",
            "🧠": "bg-amber-50 border-amber-200",
          }

          const emoji = heading.split(" ")[0]
          const cardStyle = bgMap[emoji] || "bg-gray-50 border-gray-200"

          return (
            <div key={i} className={`rounded-xl border p-5 ${cardStyle}`}>
              <h3 className="font-semibold text-gray-900 mb-2">{heading}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{body.trim()}</p>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Financial Advisor</h2>
          <p className="text-gray-500 text-sm mt-1">
            Full analysis based on your balance, transactions, budgets, and investments
          </p>
        </div>
        <Button onClick={fetchAdvice} disabled={loading} className="gap-2">
          {loading
            ? <><Loader2 size={16} className="animate-spin" /> Analysing...</>
            : ran
              ? <><RefreshCw size={16} /> Re-analyse</>
              : <><Brain size={16} /> Get Advice</>
          }
        </Button>
      </div>

      {/* Info cards */}
      {!ran && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: "💰", title: "Balance & Cash Flow", desc: "Analyses your income vs expenses and savings rate" },
            { icon: "📊", title: "Budget Health", desc: "Checks which budgets are on track and which are overrun" },
            { icon: "📈", title: "Investment Portfolio", desc: "Reviews diversification, P&L, and rebalancing needs" },
          ].map(item => (
            <Card key={item.title}>
              <CardContent className="pt-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="min-h-64">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Brain size={16} className="text-purple-500" />
            Financial Health Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!advice && !loading && !error && (
            <div className="text-center py-16 text-gray-400">
              <Brain size={44} className="mx-auto mb-3 opacity-20" />
              <p className="font-medium">Ready to analyse your finances</p>
              <p className="text-sm mt-1">Click Get Advice to generate your personalised report</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {loading && !advice && (
            <div className="flex items-center gap-3 text-gray-400 py-16 justify-center">
              <Loader2 size={20} className="animate-spin" />
              <span>Analysing your complete financial picture...</span>
            </div>
          )}

          {advice && renderAdvice(advice)}
        </CardContent>
      </Card>
    </div>
  )
}
