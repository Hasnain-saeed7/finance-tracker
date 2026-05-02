// app/(dashboard)/dashboard/transactions/page.tsx
import TransactionForm from '@/components/transactions/TransactionForm'
import TransactionList from '@/components/transactions/TransactionList'

export default function TransactionsPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Transactions</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm />
        </div>
        <div className="lg:col-span-2">
          <TransactionList />
        </div>
      </div>
    </div>
  )
}
