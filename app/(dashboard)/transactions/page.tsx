// app/(dashboard)/transactions/page.tsx
import { redirect } from 'next/navigation'

export default function TransactionsLegacyPage() {
  redirect('/dashboard/transactions')
}
