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
    { title: "Visualizacoes", value: stats.views.toLocaleString(), icon: Eye, color: "text-primary", bg: "bg-primary/10", change: "+12%" },
    { title: "Curtidas", value: Math.floor(stats.views * 0.08).toLocaleString(), icon: Heart, color: "text-danger", bg: "bg-danger/10", change: "+8%" },
    { title: "Comentarios", value: Math.floor(stats.views * 0.02).toLocaleString(), icon: MessageCircle, color: "text-warning", bg: "bg-warning/10", change: "+15%" },
    { title: "Compartilhamentos", value: Math.floor(stats.views * 0.01).toLocaleString(), icon: Share2, color: "text-success", bg: "bg-success/10", change: "+5%" },
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="text-primary" /> Analytics
          </h1>
          <p className="text-gray-sec mt-1">Acompanhe o desempenho dos seus conteudos</p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 bg-white rounded-xl border border-gray-200 outline-none"
        >
          <option value="7d">Ultimos 7 dias</option>
          <option value="30d">Ultimos 30 dias</option>
          <option value="90d">Ultimos 90 dias</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-xl shadow-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${metric.bg} rounded-xl flex items-center justify-center`}>
                <metric.icon size={20} className={metric.color} />
              </div>
              <span className="text-xs text-success font-medium flex items-center gap-1">
                <TrendingUp size={14} /> {metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold">{metric.value}</h3>
            <p className="text-sm text-gray-sec">{metric.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Visualizacoes por dia</h2>
          <div className="flex items-end justify-between h-48 gap-2">
            {weekData.map((data) => (
              <div key={data.day} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/40 transition-colors"
                  style={{ height: `${(data.views / maxViews) * 100}%` }}
                />
                <span className="text-xs text-gray-sec mt-2">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Top Conteudos</h2>
          <div className="space-y-4">
            {topContents.map((content, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-section rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
                    {i + 1}
                  </span>
                  <span className="font-medium">{content.title}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{content.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-sec">{content.engagement} eng.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
