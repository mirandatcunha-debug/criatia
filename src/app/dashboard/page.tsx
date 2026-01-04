"use client";

import { useState, useEffect } from "react";
import { FileText, Edit, Clock, CheckCircle, Plus, ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserName(user.user_metadata?.name || user.email?.split("@")[0] || "");
      const res = await fetch("/api/stats", { headers: { "x-user-id": user.id } });
      const data = await res.json();
      setStats(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const cards = [
    { title: "Total de Conteudos", value: stats.totalContents, icon: FileText, gradient: "from-violet-500 to-purple-600" },
    { title: "Rascunhos", value: stats.draftContents, icon: Edit, gradient: "from-slate-400 to-slate-600" },
    { title: "Agendados", value: stats.scheduledContents, icon: Clock, gradient: "from-amber-400 to-orange-500" },
    { title: "Publicados", value: stats.publishedContents, icon: CheckCircle, gradient: "from-emerald-400 to-green-600" },
  ];

  const statusLabels: Record<string, string> = { draft: "Rascunho", scheduled: "Agendado", published: "Publicado" };
  const statusColors: Record<string, string> = { 
    draft: "bg-slate-100 text-slate-600", 
    scheduled: "bg-amber-100 text-amber-600", 
    published: "bg-emerald-100 text-emerald-600" 
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl animate-pulse"></div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header com gradiente */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-2">Bem-vindo de volta</p>
            <h1 className="text-4xl font-bold tracking-tight">{userName || "Criador"}</h1>
            <p className="text-white/80 mt-3 flex items-center gap-2 font-medium">
              <Sparkles size={18} className="text-amber-300" />
              Pronto para criar algo incrivel?
            </p>
          </div>
          <Link 
            href="/dashboard/content" 
            className="bg-white text-purple-600 px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2 hover:shadow-xl hover:scale-105 transition-all duration-300 w-fit"
          >
            <Plus size={20} strokeWidth={2.5} /> Novo Conteudo
          </Link>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div 
            key={card.title} 
            className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 group-hover:scale-150 transition-all duration-500`}></div>
            
            <div className="relative z-10">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg mb-4`}>
                <card.icon size={22} className="text-white" strokeWidth={2} />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 tracking-tight">{card.value}</h3>
              <p className="text-sm text-gray-500 mt-2 font-medium">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de ações rápidas */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Link 
          href="/dashboard/ai"
          className="group relative overflow-hidden bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap size={26} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-tight">IA Assistente</h3>
              <p className="text-white/70 text-sm font-medium">Gere ideias e scripts</p>
            </div>
          </div>
        </Link>

        <Link 
          href="/dashboard/calendar"
          className="group relative overflow-hidden bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl p-6 text-white hover:shadow-glow-pink transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock size={26} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-tight">Calendario</h3>
              <p className="text-white/70 text-sm font-medium">Organize publicacoes</p>
            </div>
          </div>
        </Link>

        <Link 
          href="/dashboard/analytics"
          className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp size={26} strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-tight">Analytics</h3>
              <p className="text-white/70 text-sm font-medium">Veja seu desempenho</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Últimos conteúdos */}
      <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Ultimos Conteudos</h2>
            <p className="text-gray-500 text-sm font-medium mt-1">Seus conteudos mais recentes</p>
          </div>
          <Link 
            href="/dashboard/content" 
            className="text-purple-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm"
          >
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>
        
        {stats.recentContents.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
              <FileText size={36} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum conteudo ainda</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">Comece criando seu primeiro conteudo e organize toda sua producao</p>
            <Link 
              href="/dashboard/content" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3.5 rounded-2xl font-semibold hover:shadow-glow transition-all duration-300"
            >
              <Plus size={20} /> Criar primeiro conteudo
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {stats.recentContents.map((content: any) => (
              <div 
                key={content.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <FileText size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{content.title}</h4>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{content.type}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${statusColors[content.status]}`}>
                  {statusLabels[content.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
