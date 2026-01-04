"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  User,
  ChevronDown,
  Settings,
  LogOut,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const notifications = [
    {
      id: 1,
      title: "Novo insight disponível",
      message: "Seu vídeo 'Como usar IA' está em alta",
      time: "5 min atrás",
      unread: true,
    },
    {
      id: 2,
      title: "Meta atingida!",
      message: "Você alcançou 10k seguidores no Instagram",
      time: "1 hora atrás",
      unread: true,
    },
    {
      id: 3,
      title: "Lembrete de postagem",
      message: "Você tem um post agendado para hoje",
      time: "3 horas atrás",
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-dark shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-section dark:hover:bg-gray-800 text-gray-sec"
          >
            <Menu size={24} />
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-section dark:bg-gray-800 rounded-xl px-4 py-2.5 w-[300px]">
            <Search size={18} className="text-gray-sec" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent border-none outline-none text-sm text-dark dark:text-white placeholder:text-gray-sec w-full"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl hover:bg-gray-section dark:hover:bg-gray-800 text-gray-sec transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Messages */}
          <button className="p-2.5 rounded-xl hover:bg-gray-section dark:hover:bg-gray-800 text-gray-sec transition-colors relative">
            <MessageSquare size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl hover:bg-gray-section dark:hover:bg-gray-800 text-gray-sec transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </button>

            {/* Dropdown de notificações */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark rounded-xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden animate-fade-in">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-dark dark:text-white">
                    Notificações
                  </h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-section dark:hover:bg-gray-800 cursor-pointer transition-colors",
                        notif.unread && "bg-primary/5"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full mt-2",
                            notif.unread ? "bg-primary" : "bg-gray-300"
                          )}
                        />
                        <div>
                          <p className="text-sm font-medium text-dark dark:text-white">
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-sec mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-sec mt-1">
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3">
                  <button className="w-full text-center text-sm text-primary hover:underline">
                    Ver todas
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-section dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-dark dark:text-white">
                  Usuário
                </p>
                <p className="text-xs text-gray-sec">Criador</p>
              </div>
              <ChevronDown size={16} className="text-gray-sec hidden md:block" />
            </button>

            {/* Dropdown de perfil */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark rounded-xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden animate-fade-in">
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-section dark:hover:bg-gray-800 text-sm text-dark dark:text-white transition-colors">
                    <User size={18} />
                    Meu Perfil
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-section dark:hover:bg-gray-800 text-sm text-dark dark:text-white transition-colors">
                    <Settings size={18} />
                    Configurações
                  </button>
                  <hr className="my-2 border-gray-100 dark:border-gray-800" />
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-danger/10 text-sm text-danger transition-colors">
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
