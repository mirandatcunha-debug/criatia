"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Calendar, Sparkles, BarChart3, Settings, X, Zap, Crown } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-violet-500", bg: "bg-violet-100" },
    { title: "Conteudos", icon: FileText, href: "/dashboard/content", color: "text-pink-500", bg: "bg-pink-100" },
    { title: "Calendario", icon: Calendar, href: "/dashboard/calendar", color: "text-amber-500", bg: "bg-amber-100" },
    { title: "IA Assistente", icon: Sparkles, href: "/dashboard/ai", color: "text-emerald-500", bg: "bg-emerald-100" },
    { title: "Analytics", icon: BarChart3, href: "/dashboard/analytics", color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Configuracoes", icon: Settings, href: "/dashboard/settings", color: "text-slate-500", bg: "bg-slate-100" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 top-0 h-full w-[280px] bg-white border-r border-gray-100 z-50 transition-transform duration-300 lg:translate-x-0 flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={onClose} className="absolute right-4 top-4 lg:hidden text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Zap className="text-white" size={24} />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-800">
                Criat<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">IA</span>
              </span>
              <p className="text-xs text-gray-400 font-medium">Para criadores</p>
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 mt-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    isActive(item.href) 
                      ? "bg-white/20" 
                      : `${item.bg}`
                  }`}>
                    <item.icon size={20} className={isActive(item.href) ? "text-white" : item.color} />
                  </div>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Upgrade Card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <Crown size={20} />
            </div>
            <p className="font-bold mb-1">Upgrade para Pro</p>
            <p className="text-sm text-white/70 mb-4">Recursos ilimitados</p>
            <button className="w-full bg-white text-purple-600 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all">
              Ver planos
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
