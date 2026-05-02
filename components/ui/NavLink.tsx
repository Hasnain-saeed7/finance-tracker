// components/ui/NavLink.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

export default function NavLink({ href, icon, label }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

  return (
    <Link href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
        ${isActive
          ? 'bg-gray-900 text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}>
      {icon}
      {label}
    </Link>
  )
}