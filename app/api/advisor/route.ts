// app/api/advisor/route.ts
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Transaction from '@/lib/models/Transaction'
import Investment from '@/lib/models/Investment'
import Budget from '@/lib/models/Budget'
import Groq from 'groq-sdk'

const client = new Groq({ apiKey: process.env.GROQ_API_KEY! })

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()

  const [transactions, investments, budgets] = await Promise.all([
    Transaction.find({ userId: session.user.id }).sort({ date: -1 }).limit(100).lean(),
    Investment.find({ userId: session.user.id }).lean(),
    Budget.find({ userId: session.user.id }).lean(),
  ])

  if (!transactions.length && !investments.length) {
    return NextResponse.json({ advice: 'No financial data found yet. Add some transactions and investments first so I can give you personalized advice!' })
  }

  // Build financial summary
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = income - expenses
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : '0'

  const categorySpend: Record<string, number> = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount
  })

  const totalInvested = investments.reduce((s, i) => s + i.amountInvested, 0)
  const totalCurrentValue = investments.reduce((s, i) => s + i.currentValue, 0)
  const investmentPnL = totalCurrentValue - totalInvested

  const portfolioBreakdown: Record<string, number> = {}
  investments.forEach(i => {
    portfolioBreakdown[i.category] = (portfolioBreakdown[i.category] || 0) + i.currentValue
  })

  const overBudget = budgets.filter((b: any) => {
    const spent = categorySpend[b.category] || 0
    return spent > b.limit
  }).map((b: any) => b.category)

  const netWorth = balance + totalCurrentValue

  const prompt = `You are a professional personal finance advisor. Analyze this user's complete financial data and give structured, honest advice.

FINANCIAL SUMMARY:
- Total income recorded: $${income.toFixed(2)}
- Total expenses recorded: $${expenses.toFixed(2)}
- Net balance (income - expenses): $${balance.toFixed(2)}
- Savings rate: ${savingsRate}%
- Net worth (balance + investments): $${netWorth.toFixed(2)}

SPENDING BREAKDOWN:
${JSON.stringify(categorySpend, null, 2)}

BUDGET STATUS:
- Over-budget categories: ${overBudget.length ? overBudget.join(', ') : 'None — great!'}
- Total budgets set: ${budgets.length}

INVESTMENT PORTFOLIO:
- Total invested: $${totalInvested.toFixed(2)}
- Current portfolio value: $${totalCurrentValue.toFixed(2)}
- Overall P&L: $${investmentPnL.toFixed(2)} (${totalInvested > 0 ? ((investmentPnL/totalInvested)*100).toFixed(1) : 0}%)
- Portfolio breakdown by category: ${JSON.stringify(portfolioBreakdown, null, 2)}
- Number of investments: ${investments.length}

Respond in exactly this structure using emojis and clear headings:

## 🟢 What You're Doing Well
(2-3 specific positives based on the data)

## 🔴 What Needs Attention
(2-3 specific concerns — be direct and honest)

## 📌 Top 3 Action Items
(3 concrete things they should do THIS month)

## 💼 Investment Advice
(Is their portfolio diversified? What's missing? Any rebalancing needed?)

## 🧠 Risk Profile
Based on spending habits and investment choices, classify them as Conservative / Moderate / Aggressive and explain why in 2 sentences.

Be specific with numbers from the data. Keep each section to 3-4 sentences max.`

  const stream = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 1500,
    stream: true,
    messages: [
      { role: 'system', content: 'You are a professional, direct, and friendly personal finance advisor. Always base advice on the actual numbers provided.' },
      { role: 'user', content: prompt },
    ],
  })

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || ''
        if (text) controller.enqueue(new TextEncoder().encode(text))
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}