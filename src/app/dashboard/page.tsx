"use client";

import {
  Card,
  FeatureCard,
  LineChart,
  ColumnChart,
  PieChart,
} from "@/components";
import {
  Users,
  Eye,
  TrendingUp,
  PlayCircle,
  Youtube,
  Instagram,
  Video,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  // Dados de exemplo para os gráficos
  const engagementData = [
    {
      name: "YouTube",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125, 150, 180, 210],
    },
    {
      name: "Instagram",
      data: [20, 35, 40, 55, 70, 85, 90, 100, 110, 130, 145, 160],
    },
  ];

  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const visitorsData = [
    {
      name: "Visitantes",
      data: [44, 55, 57, 56, 61, 58, 63],
    },
  ];

  const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const platformDistribution = [45, 30, 25];
  const platformLabels = ["YouTube", "Instagram", "TikTok"];

  // Dados de atividades recentes
  const recentActivities = [
    {
      platform: "YouTube",
      action: "Novo vídeo publicado",
      title: "Como usar IA para criar conteúdo",
      time: "2 horas atrás",
      icon: Youtube,
      color: "text-danger",
    },
    {
      platform: "Instagram",
      action: "Story publicado",
      title: "Bastidores do novo projeto",
      time: "5 horas atrás",
      icon: Instagram,
      color: "text-pink",
    },
    {
      platform: "TikTok",
      action: "Vídeo viral",
      title: "Tutorial rápido de edição",
      time: "1 dia atrás",
      icon: Video,
      color: "text-dark dark:text-white",
    },
  ];

  // Sugestões de IA
  const aiSuggestions = [
    {
      title: "Melhor horário para postar",
      description: "Baseado nos seus dados, poste às 19h para maior engajamento",
      type: "insight",
    },
    {
      title: "Tendência identificada",
      description: '"Inteligência Artificial" está em alta no seu nicho',
      type: "trend",
    },
    {
      title: "Ideia de conteúdo",
      description: "Crie um tutorial sobre as novas features do ChatGPT",
      type: "idea",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-sec mt-1">
            Bem-vindo ao CriatIA! Aqui está o resumo das suas redes.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary flex items-center gap-2">
            <Sparkles size={18} />
            Gerar Ideias com IA
          </button>
        </div>
      </div>

      {/* Feature Cards - Métricas principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FeatureCard
          title="Total de Seguidores"
          value="45.2K"
          change="+12.5%"
          changeType="positive"
          icon={Users}
        />
        <FeatureCard
          title="Visualizações (30d)"
          value="128.5K"
          change="+8.2%"
          changeType="positive"
          icon={Eye}
          iconBg="bg-success/10"
        />
        <FeatureCard
          title="Taxa de Engajamento"
          value="4.8%"
          change="-0.5%"
          changeType="negative"
          icon={TrendingUp}
          iconBg="bg-warning/10"
        />
        <FeatureCard
          title="Vídeos Publicados"
          value="24"
          change="+3"
          changeType="positive"
          icon={PlayCircle}
          iconBg="bg-info/10"
        />
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Engajamento */}
        <Card
          className="lg:col-span-2"
          title="Crescimento de Engajamento"
          subtitle="Comparativo entre plataformas nos últimos 12 meses"
          action={
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver detalhes <ArrowRight size={14} />
            </button>
          }
        >
          <LineChart data={engagementData} categories={months} height={300} />
        </Card>

        {/* Distribuição por plataforma */}
        <Card
          title="Distribuição de Seguidores"
          subtitle="Por plataforma"
        >
          <PieChart
            data={platformDistribution}
            labels={platformLabels}
            height={280}
          />
        </Card>
      </div>

      {/* Segunda linha de cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visitantes da semana */}
        <Card
          title="Visitantes"
          action={
            <button className="text-sm text-primary hover:underline">
              Ver mais
            </button>
          }
        >
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              98,425
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="badge badge-success">+2.5%</span>
              <span className="text-sm text-gray-sec">que semana passada</span>
            </div>
          </div>
          <ColumnChart data={visitorsData} categories={weekDays} height={200} />
        </Card>

        {/* Sugestões de IA */}
        <Card
          title="Insights da IA"
          subtitle="Sugestões personalizadas para você"
          action={
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver todos <ArrowRight size={14} />
            </button>
          }
        >
          <div className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 bg-gray-section dark:bg-gray-800 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 cursor-pointer transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles size={16} className="text-primary" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-dark dark:text-white">
                      {suggestion.title}
                    </h5>
                    <p className="text-xs text-gray-sec mt-1">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Atividade recente */}
        <Card
          title="Atividade Recente"
          subtitle="Últimas ações nas suas redes"
        >
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-section dark:bg-gray-800 ${activity.color}`}
                >
                  <activity.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-dark dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-sec mt-0.5">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-sec mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Status das plataformas conectadas */}
      <Card title="Plataformas Conectadas" subtitle="Status das suas integrações">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4 p-4 bg-gray-section dark:bg-gray-800 rounded-xl">
            <div className="w-12 h-12 bg-danger/10 rounded-xl flex items-center justify-center">
              <Youtube className="text-danger" size={24} />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-dark dark:text-white">YouTube</h5>
              <p className="text-sm text-gray-sec">@seucanal</p>
            </div>
            <span className="badge badge-success">Conectado</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-section dark:bg-gray-800 rounded-xl">
            <div className="w-12 h-12 bg-pink/10 rounded-xl flex items-center justify-center">
              <Instagram className="text-pink" size={24} />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-dark dark:text-white">
                Instagram
              </h5>
              <p className="text-sm text-gray-sec">@seuperfil</p>
            </div>
            <span className="badge badge-success">Conectado</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-section dark:bg-gray-800 rounded-xl">
            <div className="w-12 h-12 bg-dark/10 dark:bg-white/10 rounded-xl flex items-center justify-center">
              <Video className="text-dark dark:text-white" size={24} />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-dark dark:text-white">TikTok</h5>
              <p className="text-sm text-gray-sec">Não conectado</p>
            </div>
            <button className="btn btn-primary text-sm py-1.5 px-3">
              Conectar
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
