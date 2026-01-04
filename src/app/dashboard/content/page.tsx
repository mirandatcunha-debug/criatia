"use client";

import { useState, useEffect } from "react";
import { Plus, FileText, Video, Image, Mic, X, Search, Filter, TrendingUp, Calendar, CheckCircle, Edit3, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Content {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  createdAt: string;
}

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "video",
    status: "draft",
  });

  const loadContents = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const res = await fetch("/api/content", { headers: { "x-user-id": user.id } });
    const data = await res.json();
    setContents(data);
    setIsLoading(false);
  };

  useEffect(() => { loadContents(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": user.id },
      body: JSON.stringify(formData),
    });

    setFormData({ title: "", description: "", type: "video", status: "draft" });
    setIsModalOpen(false);
    setIsSaving(false);
    loadContents();
  };

  // Stats
  const totalContents = contents.length;
  const draftContents = contents.filter(c => c.status === "draft").length;
  const scheduledContents = contents.filter(c => c.status === "scheduled").length;
  const publishedContents = contents.filter(c => c.status === "published").length;

  // Filtered contents
  const filteredContents = contents.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Stats by type
  const videoCount = contents.filter(c => c.type === "video").length;
  const postCount = contents.filter(c => c.type === "post").length;
  const imageCount = contents.filter(c => c.type === "image").length;
  const podcastCount = contents.filter(c => c.type === "podcast").length;

  const typeIcons: Record<string, any> = { video: Video, post: FileText, image: Image, podcast: Mic };
  const typeGradients: Record<string, string> = { 
    video: "from-red-500 to-pink-600", 
    post: "from-violet-500 to-purple-600", 
    image: "from-amber-500 to-orange-600", 
    podcast: "from-emerald-500 to-green-600" 
  };
  const statusLabels: Record<string, string> = { draft: "Rascunho", scheduled: "Agendado", published: "Publicado" };
  const statusColors: Record<string, string> = { 
    draft: "bg-slate-100 text-slate-600", 
    scheduled: "bg-amber-100 text-amber-600", 
    published: "bg-emerald-100 text-emerald-600" 
  };

  const stats = [
    { title: "Total", value: totalContents, icon: FileText, gradient: "from-violet-500 to-purple-600" },
    { title: "Rascunhos", value: draftContents, icon: Edit3, gradient: "from-slate-400 to-slate-600" },
    { title: "Agendados", value: scheduledContents, icon: Calendar, gradient: "from-amber-500 to-orange-600" },
    { title: "Publicados", value: publishedContents, icon: CheckCircle, gradient: "from-emerald-500 to-green-600" },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-24 bg-white rounded-3xl animate-pulse"></div>
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="h-24 bg-white rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-2">Gerenciamento</p>
            <h1 className="text-4xl font-bold tracking-tight">Conteudos</h1>
            <p className="text-white/80 mt-3 font-medium">
              Organize e acompanhe sua producao
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-purple-600 px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2 hover:shadow-xl hover:scale-105 transition-all duration-300 w-fit"
          >
            <Plus size={20} strokeWidth={2.5} /> Novo Conteudo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <stat.icon size={20} className="text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lista de Conteúdos - 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar conteudos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
              >
                <option value="all">Todos</option>
                <option value="draft">Rascunhos</option>
                <option value="scheduled">Agendados</option>
                <option value="published">Publicados</option>
              </select>
            </div>
          </div>

          {/* Content List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {filteredContents.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FileText size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Nenhum conteudo encontrado</h3>
                <p className="text-gray-500 text-sm">Crie seu primeiro conteudo ou ajuste os filtros</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredContents.map((content) => {
                  const Icon = typeIcons[content.type] || FileText;
                  const gradient = typeGradients[content.type] || "from-violet-500 to-purple-600";
                  return (
                    <div 
                      key={content.id} 
                      className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{content.title}</h3>
                          <p className="text-sm text-gray-500">{content.description || "Sem descricao"}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${statusColors[content.status]}`}>
                        {statusLabels[content.status]}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Analytics Panel - 1/3 */}
        <div className="space-y-4">
          {/* Por Tipo */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={18} className="text-purple-600" />
              <h3 className="font-bold text-gray-800">Por Tipo</h3>
            </div>
            <div className="space-y-3">
              {[
                { type: "video", label: "Videos", count: videoCount, color: "bg-red-500" },
                { type: "post", label: "Posts", count: postCount, color: "bg-violet-500" },
                { type: "image", label: "Imagens", count: imageCount, color: "bg-amber-500" },
                { type: "podcast", label: "Podcasts", count: podcastCount, color: "bg-emerald-500" },
              ].map((item) => (
                <div key={item.type} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-gray-600 flex-1">{item.label}</span>
                  <span className="text-sm font-bold text-gray-800">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta do Mês */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-purple-600" />
              <h3 className="font-bold text-gray-800">Meta do Mes</h3>
            </div>
            <div className="text-center py-4">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="none" />
                  <circle 
                    cx="48" cy="48" r="40" 
                    stroke="url(#gradient)" 
                    strokeWidth="8" 
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${(publishedContents / 10) * 251.2} 251.2`}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">{publishedContents}/10</span>
                </div>
              </div>
              <p className="text-sm text-gray-500">conteudos publicados</p>
            </div>
          </div>

          {/* Dica */}
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-2">Dica do dia</h3>
            <p className="text-sm text-white/80">
              Mantenha uma frequencia de publicacao para aumentar seu engajamento. Tente publicar pelo menos 3x por semana!
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Novo Conteudo</h2>
                <p className="text-gray-500 text-sm mt-1">Preencha as informacoes abaixo</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Titulo</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                  placeholder="Ex: Como crescer no Instagram"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descricao</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none h-24 resize-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                  placeholder="Descreva seu conteudo..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                  >
                    <option value="video">Video</option>
                    <option value="post">Post</option>
                    <option value="image">Imagem</option>
                    <option value="podcast">Podcast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="scheduled">Agendado</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={isSaving} 
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                ) : "Criar Conteudo"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
