"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search, Bell, Sun, Moon, User, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "sb-access-token=; path=/; max-age=0";
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-dark shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-section text-gray-sec"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center gap-2 bg-gray-section rounded-xl px-4 py-2.5 w-[300px]">
            <Search size={18} className="text-gray-sec" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl hover:bg-gray-section text-gray-sec"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="p-2.5 rounded-xl hover:bg-gray-section text-gray-sec relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-section"
            >
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark rounded-xl shadow-card border border-gray-100 overflow-hidden">
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-section text-sm">
                    <User size={18} />
                    Meu Perfil
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-danger/10 text-sm text-danger"
                  >
                    <LogOut size={18} />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
