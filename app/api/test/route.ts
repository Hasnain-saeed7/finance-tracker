// app/api/test/route.ts
import { NextResponse } from 'next/server'
import connectDB from '@/lib/db'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json({ status: 'MongoDB connected ✓' })
  } catch (error) {
    return NextResponse.json({ error: 'Connection failed', detail: String(error) }, { status: 500 })
  }
}