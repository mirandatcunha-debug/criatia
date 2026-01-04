"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Calendar, Sparkles, BarChart3, Settings, X, Zap } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const mainMenuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard", gradient: "from-violet-500 to-purple-600" },
    { title: "Conteudos", icon: FileText, href: "/dashboard/content", gradient: "from-fuchsia-500 to-pink-600" },
    { title: "Calendario", icon: Calendar, href: "/dashboard/calendar", gradient: "from-amber-500 to-orange-600" },
    { title: "IA Assistente", icon: Sparkles, href: "/dashboard/ai", gradient: "from-emerald-500 to-green-600" },
    { title: "Analytics", icon: BarChart3, href: "/dashboard/analytics", gradient: "from-blue-500 to-cyan-600" },
  ];

  const settingsMenuItems = [
    { title: "Configuracoes", icon: Settings, href: "/dashboard/settings", gradient: "from-slate-500 to-slate-600" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 top-0 h-full w-[280px] bg-white border-r border-gray-100 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={onClose} className="absolute right-4 top-4 lg:hidden text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="p-6 pb-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Zap className="text-white" size={22} />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800">
                Criat<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">IA</span>
              </span>
              <p className="text-xs text-gray-400 font-medium -mt-0.5">Para criadores</p>
            </div>
          </Link>
        </div>

        {/* Main Menu */}
        <nav className="px-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Menu</p>
          <ul className="space-y-1.5">
            {mainMenuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    isActive(item.href)
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className={`${isActive(item.href) ? "" : `w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} bg-opacity-10 flex items-center justify-center`}`}>
                    <item.icon size={isActive(item.href) ? 20 : 16} className={isActive(item.href) ? "" : "text-gray-500 group-hover:text-gray-700"} />
                  </div>
                  {!isActive(item.href) && <span className="group-hover:translate-x-1 transition-transform">{item.title}</span>}
                  {isActive(item.href) && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-6 border-t border-gray-100"></div>

          {/* Settings Menu */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Sistema</p>
          <ul className="space-y-1.5">
            {settingsMenuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    isActive(item.href)
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className={`${isActive(item.href) ? "" : `w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center`}`}>
                    <item.icon size={isActive(item.href) ? 20 : 16} className={isActive(item.href) ? "" : "text-gray-500 group-hover:text-gray-700"} />
                  </div>
                  {!isActive(item.href) && <span className="group-hover:translate-x-1 transition-transform">{item.title}</span>}
                  {isActive(item.href) && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl p-4 border border-purple-100">
            <p className="text-sm font-semibold text-gray-800 mb-1">Upgrade para Pro</p>
            <p className="text-xs text-gray-500 mb-3">Desbloqueie recursos ilimitados</p>
            <button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              Ver planos
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
