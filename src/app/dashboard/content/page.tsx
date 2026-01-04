"use client";

import { useState, useEffect } from "react";
import { Plus, FileText, Video, Image, Mic, X, Sparkles } from "lucide-react";
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl animate-pulse"></div>
        <div className="space-y-4">
          {[1,2,3].map((i) => (
            <div key={i} className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-2">Gerenciamento</p>
            <h1 className="text-4xl font-bold tracking-tight">Conteudos</h1>
            <p className="text-white/80 mt-3 font-medium">
              {contents.length} {contents.length === 1 ? "conteudo criado" : "conteudos criados"}
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

      {/* Lista de conteúdos */}
      {contents.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-card p-12 text-center border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
            <FileText size={36} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhum conteudo ainda</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">Comece criando seu primeiro conteudo e organize toda sua producao</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3.5 rounded-2xl font-semibold hover:shadow-glow transition-all duration-300"
          >
            <Plus size={20} /> Criar primeiro conteudo
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {contents.map((content) => {
            const Icon = typeIcons[content.type] || FileText;
            const gradient = typeGradients[content.type] || "from-violet-500 to-purple-600";
            return (
              <div 
                key={content.id} 
                className="bg-white rounded-2xl shadow-card p-5 flex items-center justify-between border border-gray-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">{content.title}</h3>
                    <p className="text-sm text-gray-500 font-medium mt-0.5">{content.description || "Sem descricao"}</p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-xs font-semibold ${statusColors[content.status]}`}>
                  {statusLabels[content.status]}
                </span>
              </div>
            );
          })}
        </div>
      )}

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
