// app/api/investments/route.ts
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Investment from '@/lib/models/Investment'
import { z } from 'zod'

const InvestmentSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['stocks','crypto','real-estate','gold','mutual-funds','savings','business','other']),
  amountInvested: z.number().positive(),
  currentValue: z.number().min(0),
  date: z.string(),
  notes: z.string().optional(),
})

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const investments = await Investment.find({ userId: session.user.id }).sort({ date: -1 }).lean()
  return NextResponse.json(investments)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const parsed = InvestmentSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })

  await connectDB()
  const investment = await Investment.create({ ...parsed.data, userId: session.user.id })
  return NextResponse.json(investment, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { id, currentValue } = body
  if (!id || currentValue === undefined) return NextResponse.json({ error: 'id and currentValue required' }, { status: 400 })

  await connectDB()
  const updated = await Investment.findOneAndUpdate(
    { _id: id, userId: session.user.id },
    { currentValue },
    { new: true }
  )
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  await connectDB()
  await Investment.findOneAndDelete({ _id: id, userId: session.user.id })
  return NextResponse.json({ message: 'Deleted' })
}