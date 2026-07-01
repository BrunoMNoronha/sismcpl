'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Store,
  Users,
  Package,
  TrendingDown,
  BarChart3,
  Map,
  Lightbulb,
  Sprout,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/comercios', label: 'Comércios', icon: Store },
  { href: '/produtores', label: 'Produtores', icon: Users },
  { href: '/produtos', label: 'Produtos', icon: Package },
  { href: '/demandas', label: 'Demandas Comerciais', icon: TrendingDown },
  { href: '/capacidades', label: 'Capacidades Produtivas', icon: BarChart3 },
  { href: '/visitas', label: 'Visitas de Campo', icon: Map },
  { href: '/oportunidades', label: 'Oportunidades', icon: Lightbulb },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-30 h-full bg-gradient-to-b from-emerald-900 to-emerald-950
          shadow-2xl transition-all duration-300 flex flex-col
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-emerald-800">
          <div className="w-9 h-9 bg-emerald-400 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sprout className="w-5 h-5 text-emerald-900" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-white font-bold text-sm leading-tight">SisMCPL</p>
              <p className="text-emerald-400 text-xs leading-tight">Mapeamento Comercial</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-emerald-400 hover:text-white transition-colors"
          >
            {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                    : 'text-emerald-200 hover:bg-emerald-800 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-emerald-800">
            <p className="text-emerald-500 text-xs text-center">
              Desenvolvimento Local
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
