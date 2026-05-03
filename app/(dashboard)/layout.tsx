
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/auth'
import { LayoutDashboard, ArrowLeftRight, Target, Sparkles, LogOut, TrendingUp, Brain, Menu } from 'lucide-react'
import NavLink from '@/components/ui/NavLink'
import Link from 'next/link'
import MobileNav from './MobileNav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  const initials = session.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 pb-16 md:pb-0">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-20">
        <h1 className="text-xl font-bold text-gray-900">💰 FinanceAI</h1>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">
            {initials}
          </div>
          <form autoComplete="off" action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
            <button type="submit" className="text-gray-500 hover:text-gray-900 flex items-center">
              <LogOut size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 bg-white border-r md:flex flex-col sticky top-0 h-screen z-10">

        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">💰 FinanceAI</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" />
          <NavLink href="/dashboard/transactions" icon={<ArrowLeftRight size={18} />} label="Transactions" />
          <NavLink href="/dashboard/budgets" icon={<Target size={18} />} label="Budgets" />
          <NavLink href="/dashboard/investments" icon={<TrendingUp size={18} />} label="Investments" />
          <NavLink href="/dashboard/insights" icon={<Sparkles size={18} />} label="AI Insights" />
          <NavLink href="/dashboard/advisor" icon={<Brain size={18} />} label="Advisor" />
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{session.user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
            </div>
          </div>
          <form autoComplete="off" action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
            <button type="submit"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <LogOut size={15} />
              Sign out
            </button>
          </form>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:p-4">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
