"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7d");
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
      setStats({
        totalContents: data.totalContents || 0,
        published: data.publishedContents || 0,
        views: Math.floor(Math.random() * 10000) + 1000,
        engagement: Math.floor(Math.random() * 500) + 100,
      });
    };
    loadStats();
  }, [period]);

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <BarChart3 size={32} />
            </div>
            <div>
              <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-1">Desempenho</p>
              <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
              <p className="text-white/80 mt-2 font-medium">Acompanhe suas metricas</p>
            </div>
          </div>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-5 py-3 bg-white/20 backdrop-blur rounded-xl border border-white/30 text-white font-medium outline-none cursor-pointer"
          >
            <option value="7d" className="text-gray-800">Ultimos 7 dias</option>
            <option value="30d" className="text-gray-800">Ultimos 30 dias</option>
            <option value="90d" className="text-gray-800">Ultimos 90 dias</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-2xl shadow-card p-6 border border-gray-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                <metric.icon size={22} className="text-white" />
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

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
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

        {/* Top Contents */}
        <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Top Conteudos</h2>
          <div className="space-y-4">
            {topContents.map((content, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${
                    i === 0 ? "bg-gradient-to-br from-amber-500 to-orange-600" :
                    i === 1 ? "bg-gradient-to-br from-slate-400 to-slate-500" :
                    "bg-gradient-to-br from-amber-600 to-amber-700"
                  }`}>
                    {i + 1}
                  </span>
                  <span className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{content.title}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{content.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 font-medium">{content.engagement} eng.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
