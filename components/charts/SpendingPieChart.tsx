// components/charts/SpendingPieChart.tsx
'use client'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CategoryTotal } from '@/types'

const COLORS = ['#6366f1','#22c55e','#f59e0b','#ef4444','#3b82f6','#ec4899','#14b8a6','#f97316']

export default function SpendingPieChart({ data }: { data: CategoryTotal[] }) {
  if (!data.length) return <p className="text-center text-gray-400 py-12">No expenses yet</p>

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
         <Pie 
  data={data} 
  dataKey="total" 
  nameKey="category" 
  cx="50%" 
  cy="50%" 
  outerRadius={80} 
  label={(entry) => entry.category} 
/>
        <Tooltip formatter={(val: any) => `$${val.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}