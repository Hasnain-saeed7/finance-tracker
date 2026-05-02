// app/api/register/route.ts
export const runtime='nodejs'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import connectDB from '@/lib/db'
import User from '@/lib/models/User'

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = RegisterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors.email?.[0] }, { status: 400 })
    }

    await connectDB()

    const existing = await User.findOne({ email: parsed.data.email })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12)
    const user = await User.create({
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,

    })

    return NextResponse.json({ message: 'Account created', userId: user._id }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}