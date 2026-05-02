// components/charts/MonthlyBarChart.tsx
'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function MonthlyBarChart({ data }: { data: { month: string; income: number; expenses: number }[] }) {
  if (!data.length) return <p className="text-center text-gray-400 py-12">No data yet</p>

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(val: number) => `$${val.toFixed(2)}`} />
        <Legend />
        <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}