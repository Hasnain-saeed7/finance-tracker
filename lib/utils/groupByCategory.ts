// lib/utils/groupByCategory.ts
import { ITransaction, CategoryTotal } from '@/types'

export function groupByCategory(transactions: ITransaction[]): CategoryTotal[] {
  const map: Record<string, number> = {}

  transactions.forEach((t) => {
    if (t.type === 'expense') {
      map[t.category] = (map[t.category] || 0) + t.amount
    }
  })

  return Object.entries(map)
    .map(([category, total]) => ({ category: category as any, total }))
    .sort((a, b) => b.total - a.total)
}

export function groupByMonth(transactions: ITransaction[]) {
  const map: Record<string, { income: number; expenses: number }> = {}

  transactions.forEach((t) => {
    const month = new Date(t.date).toISOString().slice(0, 7) // "2026-05"
    if (!map[month]) map[month] = { income: 0, expenses: 0 }
    if (t.type === 'income') map[month].income += t.amount
    else map[month].expenses += t.amount
  })

  return Object.entries(map)
    .map(([month, totals]) => ({ month, ...totals }))
    .sort((a, b) => a.month.localeCompare(b.month))
}