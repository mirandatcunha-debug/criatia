"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Calendar, Sparkles, BarChart3, Settings, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { title: "Conteudos", icon: FileText, href: "/dashboard/content" },
    { title: "Calendario", icon: Calendar, href: "/dashboard/calendar" },
    { title: "IA Assistente", icon: Sparkles, href: "/dashboard/ai" },
    { title: "Analytics", icon: BarChart3, href: "/dashboard/analytics" },
    { title: "Configuracoes", icon: Settings, href: "/dashboard/settings" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`fixed left-0 top-0 h-full w-[260px] bg-white dark:bg-dark shadow-sidebar z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={onClose} className="absolute right-4 top-4 lg:hidden text-gray-sec">
          <X size={24} />
        </button>

        <div className="p-6 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-dark dark:text-white">
              Criat<span className="text-primary">IA</span>
            </span>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-primary text-white"
                      : "text-gray-sec hover:bg-gray-section"
                  }`}
                >
                  <item.icon size={20} />
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <p className="text-xs text-gray-sec text-center">
            CriatIA 2024 - <span className="text-primary">Feito para criadores</span>
          </p>
        </div>
      </aside>
    </>
  );
}
