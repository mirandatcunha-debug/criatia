"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Eye, Heart, MessageCircle, Share2, Trophy, Lightbulb, Flame, Youtube, Instagram, Music2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7d");
  const [platform, setPlatform] = useState("youtube");
  const [stats, setStats] = useState({
    totalContents: 0,
    published: 0,
    views: 0,
    engagement: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const res = await fetch("/api/stats", { headers: { "x-user-id": user.id } });
      const data = await res.json();
      
      // Simular dados diferentes por plataforma
      const multiplier = platform === "youtube" ? 1 : platform === "instagram" ? 0.8 : 0.6;
      setStats({
        totalContents: data.totalContents || 0,
        published: data.publishedContents || 0,
        views: Math.floor((Math.random() * 10000 + 1000) * multiplier),
        engagement: Math.floor((Math.random() * 500 + 100) * multiplier),
      });
    };
    loadStats();
  }, [period, platform]);

  const platforms = [
    { id: "youtube", label: "YouTube", icon: Youtube, color: "bg-red-500", activeColor: "from-red-500 to-red-600" },
    { id: "instagram", label: "Instagram", icon: Instagram, color: "bg-pink-500", activeColor: "from-pink-500 to-purple-600" },
    { id: "tiktok", label: "TikTok", icon: Music2, color: "bg-gray-800", activeColor: "from-gray-800 to-gray-900" },
  ];

  const metrics = [
    { title: "Visualizacoes", value: stats.views.toLocaleString(), icon: Eye, gradient: "from-violet-500 to-purple-600", change: "+12%" },
    { title: "Curtidas", value: Math.floor(stats.views * 0.08).toLocaleString(), icon: Heart, gradient: "from-fuchsia-500 to-pink-600", change: "+8%" },
    { title: "Comentarios", value: Math.floor(stats.views * 0.02).toLocaleString(), icon: MessageCircle, gradient: "from-amber-500 to-orange-600", change: "+15%" },
    { title: "Compartilhamentos", value: Math.floor(stats.views * 0.01).toLocaleString(), icon: Share2, gradient: "from-emerald-500 to-green-600", change: "+5%" },
  ];

  const weekData = [
    { day: "Seg", views: 1200 },
    { day: "Ter", views: 1800 },
    { day: "Qua", views: 1400 },
    { day: "Qui", views: 2200 },
    { day: "Sex", views: 2800 },
    { day: "Sab", views: 3200 },
    { day: "Dom", views: 2600 },
  ];

  const maxViews = Math.max(...weekData.map(d => d.views));

  const topContents = [
    { title: "Como comecar no YouTube", views: 3420, engagement: "8.2%" },
    { title: "5 dicas de produtividade", views: 2180, engagement: "6.5%" },
    { title: "Minha rotina matinal", views: 1890, engagement: "7.1%" },
  ];

  const insightsUsados = [
    { text: "Postar as 18h aumenta engajamento", used: true },
    { text: "Videos curtos performam melhor", used: true },
    { text: "Usar hashtags trending", used: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
                <BarChart3 size={32} />
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-1">Desempenho</p>
                <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Platform Buttons */}
              <div className="flex bg-white/10 backdrop-blur rounded-xl p-1">
                {platforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      platform === p.id 
                        ? `bg-gradient-to-r ${p.activeColor} text-white shadow-lg` 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <p.icon size={18} />
                    <span className="hidden sm:inline">{p.label}</span>
                  </button>
                ))}
              </div>

              {/* Period Select */}
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2.5 bg-white/20 backdrop-blur rounded-xl border border-white/30 text-white font-medium outline-none cursor-pointer"
              >
                <option value="7d" className="text-gray-800">Ultimos 7 dias</option>
                <option value="30d" className="text-gray-800">Ultimos 30 dias</option>
                <option value="90d" className="text-gray-800">Ultimos 90 dias</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <metric.icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
                <TrendingUp size={12} /> {metric.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{metric.value}</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Charts - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Visualizacoes por dia</h2>
            <div className="flex items-end justify-between h-48 gap-3">
              {weekData.map((data) => (
                <div key={data.day} className="flex flex-col items-center flex-1 group">
                  <div className="relative w-full flex justify-center mb-2">
                    <span className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {data.views}
                    </span>
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-violet-500 to-purple-400 rounded-t-lg hover:from-violet-600 hover:to-purple-500 transition-all duration-300 cursor-pointer"
                    style={{ height: `${(data.views / maxViews) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 font-medium mt-3">{data.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance por Plataforma */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Performance Comparativa</h2>
            <div className="space-y-4">
              {platforms.map((p) => {
                const value = p.id === "youtube" ? 78 : p.id === "instagram" ? 62 : 45;
                return (
                  <div key={p.id} className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${p.color} rounded-xl flex items-center justify-center`}>
                      <p.icon size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-700">{p.label}</span>
                        <span className="text-sm font-bold text-gray-800">{value}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${p.activeColor} rounded-full transition-all duration-500`}
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Insights Panel - 1/3 */}
        <div className="space-y-4">
          {/* Top Conteúdos */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={18} className="text-amber-500" />
              <h3 className="font-bold text-gray-800">Top Conteudos</h3>
            </div>
            <div className="space-y-3">
              {topContents.map((content, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                    i === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600" :
                    i === 1 ? "bg-gradient-to-br from-gray-300 to-gray-400" :
                    "bg-gradient-to-br from-amber-600 to-amber-700"
                  }`}>
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{content.title}</p>
                    <p className="text-xs text-gray-500">{content.views.toLocaleString()} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights Usados */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={18} className="text-violet-500" />
              <h3 className="font-bold text-gray-800">Insights da IA</h3>
            </div>
            <div className="space-y-3">
              {insightsUsados.map((insight, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    insight.used ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
                  }`}>
                    {insight.used ? "✓" : "○"}
                  </div>
                  <p className="text-sm text-gray-700">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Maior Engajamento */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={18} className="text-orange-500" />
              <h3 className="font-bold text-gray-800">Maior Engajamento</h3>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
              <p className="font-semibold text-gray-800 mb-1">Como comecar no YouTube</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Eye size={14} /> 3.4k
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={14} /> 280
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} /> 45
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-orange-200">
                <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg">
                  8.2% taxa de engajamento
                </span>
              </div>
            </div>
          </div>

          {/* Dica */}
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-2">Dica de Melhoria</h3>
            <p className="text-sm text-white/80">
              Seus videos no YouTube tem melhor performance. Considere aumentar a frequencia de posts nessa plataforma!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
