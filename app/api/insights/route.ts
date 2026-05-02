// app/api/insights/route.ts
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Transaction from '@/lib/models/Transaction'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()

  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month') || new Date().toISOString().slice(0, 7)

  const start = new Date(`${month}-01`)
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)

  const transactions = await Transaction.find({
    userId: session.user.id,
    date: { $gte: start, $lte: end },
  }).lean()

  if (!transactions.length) {
    return NextResponse.json({ insight: 'No transactions found for this month. Add some transactions first!' })
  }

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  const categoryTotals: Record<string, number> = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount
  })

  const top = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([cat, amt]) => `${cat}: $${amt.toFixed(2)}`).join(', ')

  // Stream response from Claude
  const stream = await client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a friendly personal finance assistant. Analyze this spending data for ${month} and give 4-5 clear, actionable insights. Be specific with numbers. Use bullet points with emojis.

Total income: $${income.toFixed(2)}
Total expenses: $${expenses.toFixed(2)}
Net savings: $${(income - expenses).toFixed(2)}
Top spending categories: ${top}
Full breakdown: ${JSON.stringify(categoryTotals, null, 2)}

Give honest, helpful advice. If overspending, flag it clearly. Suggest one concrete saving tip.`
      }
    ]
  })

  // Stream the text back to client
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          controller.enqueue(new TextEncoder().encode(chunk.delta.text))
        }
      }
      controller.close()
    }
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}