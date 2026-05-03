'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ArrowLeftRight, Target, Sparkles, TrendingUp, Brain } from 'lucide-react'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Home' },
    { href: '/dashboard/transactions', icon: <ArrowLeftRight size={20} />, label: 'Txns' },
    { href: '/dashboard/budgets', icon: <Target size={20} />, label: 'Budget' },
    { href: '/dashboard/investments', icon: <TrendingUp size={20} />, label: 'Invest' },
    { href: '/dashboard/insights', icon: <Sparkles size={20} />, label: 'Insights' },
    { href: '/dashboard/advisor', icon: <Brain size={20} />, label: 'Advisor' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center px-1 py-1 z-20" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 4px)' }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
        
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex flex-col items-center justify-center w-full py-1 ${isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className={`mb-1 ${isActive ? 'bg-gray-100 rounded-full p-1' : 'p-1'}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
