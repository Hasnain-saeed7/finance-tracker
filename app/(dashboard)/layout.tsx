// // app/(dashboard)/layout.tsx
// import { auth } from '@/auth'
// import { redirect } from 'next/navigation'
// import Link from 'next/link'
// import { signOut } from '@/auth'
// import { LayoutDashboard, ArrowLeftRight, Target, Sparkles, LogOut } from 'lucide-react'

// export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const session = await auth()
//   if (!session) redirect('/login')

//   return (
//     <div className="min-h-screen flex bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r flex flex-col">
//         <div className="p-6 border-b">
//           <h1 className="text-xl font-bold text-gray-900">💰 FinanceAI</h1>
//           <p className="text-sm text-gray-500 mt-1">{session.user?.name}</p>
//         </div>

//         <nav className="flex-1 p-4 space-y-1">
//           <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" />
//           <NavLink href="/transactions" icon={<ArrowLeftRight size={18} />} label="Transactions" />
//           <NavLink href="/budgets" icon={<Target size={18} />} label="Budgets" />
//           <NavLink href="/insights" icon={<Sparkles size={18} />} label="AI Insights" />
//         </nav>

//         <div className="p-4 border-t">
//           <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
//             <button type="submit" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
//               <LogOut size={18} />
//               Sign out
//             </button>
//           </form>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 overflow-auto">
//         {children}
//       </main>
//     </div>
//   )
// }

// function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
//   return (
//     <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
//       {icon}
//       {label}
//     </Link>
//   )
// } 








// app/(dashboard)/layout.tsx
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { signOut } from '@/auth'
import { LayoutDashboard, ArrowLeftRight, Target, Sparkles, LogOut } from 'lucide-react'
import NavLink from '@/components/ui/NavLink'   // 👈 import client component

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">💰 FinanceAI</h1>
          <p className="text-sm text-gray-500 mt-1">{session.user?.name}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/dashboard" icon={<LayoutDashboard size={18} />} label="Overview" />
          <NavLink href="/dashboard/transactions" icon={<ArrowLeftRight size={18} />} label="Transactions" />
          <NavLink href="/dashboard/budgets" icon={<Target size={18} />} label="Budgets" />
          <NavLink href="/dashboard/insights" icon={<Sparkles size={18} />} label="AI Insights" />
        </nav>

        <div className="p-4 border-t">
          <form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
            <button type="submit"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <LogOut size={18} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
// 👇 remove the old NavLink function entirely — it's now in components/ui/NavLink.tsx