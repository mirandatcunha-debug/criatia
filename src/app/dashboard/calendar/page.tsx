"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
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
    draft: "bg-gray-400",
    scheduled: "bg-warning",
    published: "bg-success",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendario</h1>
        <p className="text-gray-sec mt-1">Visualize seus conteudos por data</p>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-section rounded-lg">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-section rounded-lg">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-sec py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24 bg-gray-50 rounded-lg"></div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayContents = getContentsForDay(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();
            return (
              <div key={day} className={`h-24 p-1 rounded-lg border ${isToday ? "border-primary bg-primary/5" : "border-gray-100 bg-gray-50"}`}>
                <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day}</span>
                <div className="mt-1 space-y-1">
                  {dayContents.slice(0, 2).map((content) => (
                    <div key={content.id} className={`text-xs truncate px-1 py-0.5 rounded text-white ${statusColors[content.status]}`}>
                      {content.title}
                    </div>
                  ))}
                  {dayContents.length > 2 && (
                    <span className="text-xs text-gray-sec">+{dayContents.length - 2}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span className="text-sm text-gray-sec">Rascunho</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning"></div>
          <span className="text-sm text-gray-sec">Agendado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="text-sm text-gray-sec">Publicado</span>
        </div>
      </div>
    </div>
  );
}
