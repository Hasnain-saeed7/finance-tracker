// // app/api/transactions/route.ts
// export const runtime = 'nodejs'

// import { NextRequest, NextResponse } from 'next/server'
// import { auth } from '@/auth'
// import connectDB from '@/lib/db'
// import Transaction from '@/lib/models/Transaction'
// import { z } from 'zod'

// const TransactionSchema = z.object({
//   type: z.enum(['income', 'expense']),
//   amount: z.number().positive(),
//   category: z.enum(['food','transport','shopping','bills','health','entertainment','salary','freelance','investment','other']),
//   description: z.string().min(1),
//   date: z.string(),
//   tags: z.array(z.string()).optional(),
// })

// export async function GET(req: NextRequest) {
//   const session = await auth()
//   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   await connectDB()
//   const { searchParams } = new URL(req.url)
//   const type = searchParams.get('type')
//   const category = searchParams.get('category')
//   const limit = parseInt(searchParams.get('limit') || '50')

//   const filter: any = { userId: session.user.id }
//   if (type) filter.type = type
//   if (category) filter.category = category

//   const transactions = await Transaction.find(filter).sort({ date: -1 }).limit(limit).lean()
//   return NextResponse.json(transactions)
// }

// export async function POST(req: NextRequest) {
//   const session = await auth()
//   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const body = await req.json()
//   const parsed = TransactionSchema.safeParse(body)
//     if (!parsed.success) {
//       return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })
//     }

//   await connectDB()
//   const transaction = await Transaction.create({ ...parsed.data, userId: session.user.id })
//   return NextResponse.json(transaction, { status: 201 })
// }

// export async function DELETE(req: NextRequest) {
//   const session = await auth()
//   if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//   const { searchParams } = new URL(req.url)
//   const id = searchParams.get('id')
//   if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

//   await connectDB()
//   await Transaction.findOneAndDelete({ _id: id, userId: session.user.id })
//   return NextResponse.json({ message: 'Deleted' })
// }





























export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Transaction from '@/lib/models/Transaction'
import Investment from '@/lib/models/Investment'
import { z } from 'zod'

const TransactionSchema = z.object({
  type: z.enum(['income', 'expense']),
  amount: z.number().positive(),
  category: z.enum(['food','transport','shopping','bills','health','entertainment','salary','freelance','investment','other']),
  description: z.string().min(1),
  date: z.string(),
  tags: z.array(z.string()).optional(),
})

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const category = searchParams.get('category')
  const limit = parseInt(searchParams.get('limit') || '50')

  const filter: any = { userId: session.user.id }
  if (type) filter.type = type
  if (category) filter.category = category

  const transactions = await Transaction.find(filter).sort({ date: -1 }).limit(limit).lean()
  return NextResponse.json(transactions)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = TransactionSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

  await connectDB()

  // For expenses, check available balance
  if (parsed.data.type === 'expense') {
    const [transactions, investments] = await Promise.all([
      Transaction.find({ userId: session.user.id }).lean(),
      Investment.find({ userId: session.user.id }).lean(),
    ])

    const income = transactions
      .filter((t: any) => t.type === 'income')
      .reduce((s: number, t: any) => s + t.amount, 0)

    const expenses = transactions
      .filter((t: any) => t.type === 'expense')
      .reduce((s: number, t: any) => s + t.amount, 0)

    const totalInvested = investments
      .reduce((s: number, i: any) => s + i.amountInvested, 0)

    const availableBalance = income - expenses - totalInvested

    if (parsed.data.amount > availableBalance) {
      return NextResponse.json({
        error: `Insufficient balance. You only have ${availableBalance.toFixed(2)} available.`,
      }, { status: 400 })
    }
  }

  const transaction = await Transaction.create({
    ...parsed.data,
    userId: session.user.id,
  })

  return NextResponse.json(transaction, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  await connectDB()
  await Transaction.findOneAndDelete({ _id: id, userId: session.user.id })
  return NextResponse.json({ message: 'Deleted' })
}