// app/api/budgets/route.ts
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Budget from '@/lib/models/Budget'
import Transaction from '@/lib/models/Transaction'
import { z } from 'zod'

const BudgetSchema = z.object({
  category: z.enum(['food','transport','shopping','bills','health','entertainment','salary','freelance','investment','other']),
  limit: z.number().positive(),
  month: z.string(), // "2026-05"
})

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const { searchParams } = new URL(req.url)
  const month = searchParams.get('month') || new Date().toISOString().slice(0, 7)

  // Get budgets for this month
  const budgets = await Budget.find({ userId: session.user.id, month }).lean()

  // Get actual spending per category this month
  const start = new Date(`${month}-01`)
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)

  const transactions = await Transaction.find({
    userId: session.user.id,
    type: 'expense',
    date: { $gte: start, $lte: end },
  }).lean()

  const spent: Record<string, number> = {}
  transactions.forEach(t => {
    spent[t.category] = (spent[t.category] || 0) + t.amount
  })

  const result = budgets.map(b => ({
    ...b,
    spent: spent[b.category] || 0,
  }))

  return NextResponse.json(result)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = BudgetSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  await connectDB()

  // Upsert — one budget per category per month
  const budget = await Budget.findOneAndUpdate(
    { userId: session.user.id, category: parsed.data.category, month: parsed.data.month },
    { ...parsed.data, userId: session.user.id },
    { upsert: true, new: true }
  )

  return NextResponse.json(budget, { status: 201 })
}


export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  await connectDB()
  await Budget.findOneAndDelete({ _id: id, userId: session.user.id })
  return NextResponse.json({ message: 'Deleted' })
}