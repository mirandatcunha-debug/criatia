"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Content {
  id: string;
  title: string;
  type: string;
  status: string;
  scheduledAt: string | null;
  createdAt: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [contents, setContents] = useState<Content[]>([]);

  const months = ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  useEffect(() => {
    const loadContents = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const res = await fetch("/api/content", { headers: { "x-user-id": user.id } });
      const data = await res.json();
      setContents(data);
    };
    loadContents();
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getContentsForDay = (day: number) => {
    return contents.filter((content) => {
      const date = content.scheduledAt ? new Date(content.scheduledAt) : new Date(content.createdAt);
      return date.getDate() === day && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
    });
  };

  const statusColors: Record<string, string> = {
    draft: "bg-slate-400",
    scheduled: "bg-amber-500",
    published: "bg-emerald-500",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Calendar size={32} />
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-1">Organizacao</p>
            <h1 className="text-4xl font-bold tracking-tight">Calendario</h1>
            <p className="text-white/80 mt-2 font-medium">Visualize seus conteudos por data</p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={prevMonth} 
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={nextMonth} 
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-28 bg-gray-50 rounded-xl"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayContents = getContentsForDay(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
            return (
              <div 
                key={day} 
                className={`h-28 p-2 rounded-xl border-2 transition-all hover:shadow-md ${
                  isToday 
                    ? "border-purple-500 bg-purple-50" 
                    : "border-gray-100 bg-gray-50 hover:border-gray-200"
                }`}
              >
                <span className={`text-sm font-bold ${isToday ? "text-purple-600" : "text-gray-700"}`}>
                  {day}
                </span>
                <div className="mt-1 space-y-1">
                  {dayContents.slice(0, 2).map((content) => (
                    <div 
                      key={content.id} 
                      className={`text-xs truncate px-2 py-1 rounded-lg text-white font-medium ${statusColors[content.status]}`}
                    >
                      {content.title}
                    </div>
                  ))}
                  {dayContents.length > 2 && (
                    <span className="text-xs text-gray-500 font-medium">+{dayContents.length - 2} mais</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-slate-400"></div>
          <span className="text-sm font-medium text-gray-600">Rascunho</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-amber-500"></div>
          <span className="text-sm font-medium text-gray-600">Agendado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
          <span className="text-sm font-medium text-gray-600">Publicado</span>
        </div>
      </div>
    </div>
  );
}
