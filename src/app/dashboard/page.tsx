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
    { title: "Total de Conteudos", value: stats.totalContents, icon: FileText, gradient: "from-violet-500 to-purple-600", emoji: "📝" },
    { title: "Rascunhos", value: stats.draftContents, icon: Edit, gradient: "from-slate-400 to-slate-500", emoji: "✏️" },
    { title: "Agendados", value: stats.scheduledContents, icon: Clock, gradient: "from-amber-400 to-orange-500", emoji: "📅" },
    { title: "Publicados", value: stats.publishedContents, icon: CheckCircle, gradient: "from-emerald-400 to-green-500", emoji: "🚀" },
  ];

  const statusLabels: Record<string, string> = { draft: "Rascunho", scheduled: "Agendado", published: "Publicado" };
  const statusEmojis: Record<string, string> = { draft: "✏️", scheduled: "📅", published: "🚀" };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
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
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Bem-vindo de volta! 👋</p>
            <h1 className="text-3xl font-bold">{userName || "Criador"}</h1>
            <p className="text-white/80 mt-2 flex items-center gap-2">
              <Sparkles size={16} />
              Pronto para criar conteudo incrivel hoje?
            </p>
          </div>
          <Link 
            href="/dashboard/content" 
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all"
          >
            <Plus size={20} /> Novo Conteudo
          </Link>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div 
            key={card.title} 
            className="group relative overflow-hidden bg-white rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{card.emoji}</span>
                <div className={`w-10 h-10 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <card.icon size={18} className="text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Seção de ações rápidas */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Link 
          href="/dashboard/ai"
          className="group bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">IA Assistente</h3>
              <p className="text-white/80 text-sm">Gere ideias e scripts</p>
            </div>
          </div>
        </Link>

        <Link 
          href="/dashboard/calendar"
          className="group bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white hover:shadow-glow-pink transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Calendario</h3>
              <p className="text-white/80 text-sm">Organize suas publicacoes</p>
            </div>
          </div>
        </Link>

        <Link 
          href="/dashboard/analytics"
          className="group bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Analytics</h3>
              <p className="text-white/80 text-sm">Veja seu desempenho</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Últimos conteúdos */}
      <div className="bg-white rounded-2xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Ultimos Conteudos ✨</h2>
            <p className="text-gray-500 text-sm">Seus conteudos mais recentes</p>
          </div>
          <Link 
            href="/dashboard/content" 
            className="text-purple-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>
        
        {stats.recentContents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-gray-500 mb-4">Nenhum conteudo criado ainda</p>
            <Link 
              href="/dashboard/content" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
            >
              <Plus size={18} /> Criar primeiro conteudo
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {stats.recentContents.map((content: any, index: number) => (
              <div 
                key={content.id} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{statusEmojis[content.status]}</span>
                  <div>
                    <h4 className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">{content.title}</h4>
                    <p className="text-xs text-gray-500">{content.type}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-500">
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
