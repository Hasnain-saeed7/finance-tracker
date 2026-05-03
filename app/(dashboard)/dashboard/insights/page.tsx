
"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2 } from "lucide-react"

export default function InsightsPage() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))
  const [insight, setInsight] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function fetchInsights() {
    setLoading(true)
    setInsight("")
    setError("")

    try {
      const res = await fetch(`/api/insights?month=${month}`)

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Something went wrong")
        setLoading(false)
        return
      }

      // Check if it's a plain JSON response (no transactions case)
      const contentType = res.headers.get("content-type") || ""
      if (contentType.includes("application/json")) {
        const data = await res.json()
        setInsight(data.insight)
        setLoading(false)
        return
      }

      // Stream the response
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setInsight(prev => prev + decoder.decode(value))
      }
    } catch (err) {
      setError("Failed to fetch insights. Check your API key.")
    }

    setLoading(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Insights</h2>
          <p className="text-gray-500 text-sm mt-1">Powered by Claude — get smart analysis of your spending</p>
        </div>
        <div className="flex items-center gap-3">
          <Input type="month" value={month} onChange={e => setMonth(e.target.value)} className="w-40" />
          <Button onClick={fetchInsights} disabled={loading} className="gap-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {loading ? "Analysing..." : "Analyse"}
          </Button>
        </div>
      </div>

      <Card className="min-h-64">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles size={16} className="text-purple-500" />
            Monthly Analysis — {month}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!insight && !loading && !error && (
            <div className="text-center py-12 text-gray-400">
              <Sparkles size={40} className="mx-auto mb-3 opacity-30" />
              <p>Click Analyse to get AI-powered insights on your spending</p>
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {insight && (
            <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
              {insight}
            </div>
          )}
          {loading && !insight && (
            <div className="flex items-center gap-2 text-gray-400 py-12 justify-center">
              <Loader2 size={20} className="animate-spin" />
              <span>Claude is analysing your finances...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
