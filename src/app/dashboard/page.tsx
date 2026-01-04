"use client";

import { useState, useEffect } from "react";
import { FileText, Edit, Clock, CheckCircle, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalContents: 0,
    draftContents: 0,
    scheduledContents: 0,
    publishedContents: 0,
    recentContents: [],
  });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserName(user.user_metadata?.name || user.email?.split("@")[0] || "");
      const res = await fetch("/api/stats", { headers: { "x-user-id": user.id } });
      const data = await res.json();
      setStats(data);
    };
    loadData();
  }, []);

  const cards = [
    { title: "Total", value: stats.totalContents, icon: FileText, bg: "bg-primary/10", color: "text-primary" },
    { title: "Rascunhos", value: stats.draftContents, icon: Edit, bg: "bg-gray-200", color: "text-gray-600" },
    { title: "Agendados", value: stats.scheduledContents, icon: Clock, bg: "bg-warning/10", color: "text-warning" },
    { title: "Publicados", value: stats.publishedContents, icon: CheckCircle, bg: "bg-success/10", color: "text-success" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ola, {userName}! </h1>
          <p className="text-gray-sec mt-1">Resumo dos seus conteudos</p>
        </div>
        <Link href="/dashboard/content" className="btn btn-primary flex items-center gap-2">
          <Plus size={18} /> Novo Conteudo
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-card p-5">
            <p className="text-sm text-gray-sec">{card.title}</p>
            <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Ultimos Conteudos</h2>
          <Link href="/dashboard/content" className="text-primary text-sm">Ver todos</Link>
        </div>
        {stats.recentContents.length === 0 ? (
          <p className="text-gray-sec text-center py-8">Nenhum conteudo ainda</p>
        ) : (
          <div className="space-y-3">
            {stats.recentContents.map((content: any) => (
              <div key={content.id} className="flex items-center justify-between p-3 bg-gray-section rounded-xl">
                <span className="font-medium">{content.title}</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">{content.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
