"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Youtube,
  Instagram,
  Video,
  Calendar,
  MessageSquare,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: { title: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    href: "/dashboard",
  },
  {
    title: "Plataformas",
    icon: <Video size={20} />,
    submenu: [
      { title: "YouTube", href: "/platforms/youtube" },
      { title: "Instagram", href: "/platforms/instagram" },
      { title: "TikTok", href: "/platforms/tiktok" },
    ],
  },
  {
    title: "Conteúdo",
    icon: <FileText size={20} />,
    submenu: [
      { title: "Criar Conteúdo", href: "/content/create" },
      { title: "Biblioteca", href: "/content/library" },
      { title: "Calendário", href: "/content/calendar" },
    ],
  },
  {
    title: "IA Assistente",
    icon: <Sparkles size={20} />,
    submenu: [
      { title: "Gerar Ideias", href: "/ai/ideas" },
      { title: "Criar Scripts", href: "/ai/scripts" },
      { title: "Análise de Tendências", href: "/ai/trends" },
    ],
  },
  {
    title: "Analytics",
    icon: <BarChart3 size={20} />,
    href: "/analytics",
  },
  {
    title: "Calendário",
    icon: <Calendar size={20} />,
    href: "/calendar",
  },
  {
    title: "Configurações",
    icon: <Settings size={20} />,
    href: "/settings",
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(["Plataformas"]);

  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isSubmenuActive = (submenu: { title: string; href: string }[]) =>
    submenu.some((item) => pathname === item.href);

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-[260px] bg-white dark:bg-dark shadow-sidebar z-50 transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button mobile */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 lg:hidden text-gray-sec hover:text-dark dark:hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-dark dark:text-white">
              Criat<span className="text-primary">IA</span>
            </span>
          </Link>
        </div>

        {/* Menu */}
        <nav className="p-4 h-[calc(100%-180px)] overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.title}>
                {item.submenu ? (
                  // Item com submenu
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                        isSubmenuActive(item.submenu)
                          ? "bg-primary/10 text-primary"
                          : "text-gray-sec hover:bg-gray-section dark:hover:bg-gray-800 hover:text-dark dark:hover:text-white"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon}
                        {item.title}
                      </span>
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform",
                          openMenus.includes(item.title) && "rotate-180"
                        )}
                      />
                    </button>
                    {openMenus.includes(item.title) && (
                      <ul className="mt-1 ml-4 pl-4 border-l border-gray-100 dark:border-gray-800 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                "block px-4 py-2.5 rounded-lg text-sm transition-all",
                                isActive(subItem.href)
                                  ? "bg-primary text-white"
                                  : "text-gray-sec hover:bg-gray-section dark:hover:bg-gray-800 hover:text-dark dark:hover:text-white"
                              )}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  // Item simples
                  <Link
                    href={item.href!}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive(item.href!)
                        ? "bg-primary text-white"
                        : "text-gray-sec hover:bg-gray-section dark:hover:bg-gray-800 hover:text-dark dark:hover:text-white"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-sec text-center">
            CriatIA © 2024
            <br />
            <span className="text-primary">Feito para criadores</span>
          </p>
        </div>
      </aside>
    </>
  );
}
