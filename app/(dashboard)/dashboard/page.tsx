
import { auth } from '@/auth'
import connectDB from '@/lib/db'
import Transaction from '@/lib/models/Transaction'
import Investment from '@/lib/models/Investment'
import { formatCurrency } from '@/lib/utils/formatCurrency'
import { groupByCategory, groupByMonth } from '@/lib/utils/groupByCategory'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Wallet, ArrowLeftRight, PiggyBank } from 'lucide-react'
import SpendingPieChart from '@/components/charts/SpendingPieChart'
import MonthlyBarChart from '@/components/charts/MonthlyBarChart'

export default async function DashboardPage() {
  const session = await auth()
  await connectDB()

  const [transactions, investments] = await Promise.all([
    Transaction.find({ userId: session!.user.id }).sort({ date: -1 }).lean(),
    Investment.find({ userId: session!.user.id }).lean(),
  ])

  const income = transactions.filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + t.amount, 0)
  const expenses = transactions.filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + t.amount, 0)
  const totalInvested = investments.reduce((s: number, i: any) => s + i.amountInvested, 0)
  const balance = income - expenses - totalInvested

  const categoryTotals = groupByCategory(transactions as any)
  const monthlyData = groupByMonth(transactions as any)

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Balance"
          value={formatCurrency(balance)}
          icon={<Wallet className="text-blue-500" />}
          valueColor={balance < 0 ? 'text-red-600' : 'text-gray-900'}
        />
        <StatCard
          title="Total Income"
          value={formatCurrency(income)}
          icon={<TrendingUp className="text-shadow-slate-700" />}
          valueColor="text-green-600"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(expenses)}
          icon={<TrendingDown className="text-red-500" />}
          valueColor="text-red-600"
        />
        <StatCard
          title="Total Invested"
          value={formatCurrency(totalInvested)}
          icon={<Wallet className="text-purple-500" />}
          valueColor="text-purple-600"
        />
        <StatCard
          title="Transactions"
          value={String(transactions.length)}
          icon={<ArrowLeftRight className="text-orange-500" />}
          valueColor="text-gray-900"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Monthly Overview</CardTitle></CardHeader>
          <CardContent>
            <MonthlyBarChart data={monthlyData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Spending by Category</CardTitle></CardHeader>
          <CardContent>
            <SpendingPieChart data={categoryTotals} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  valueColor = 'text-gray-900',
}: {
  title: string
  value: string
  icon: React.ReactNode
  valueColor?: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-500">{title}</p>
          {icon}
        </div>
        <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      </CardContent>
    </Card>
  )
}
