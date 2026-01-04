"use client";

import { useState, useEffect } from "react";
import { Plus, FileText, Video, Image, Mic, X } from "lucide-react";
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
  const statusLabels: Record<string, string> = { draft: "Rascunho", scheduled: "Agendado", published: "Publicado" };
  const statusColors: Record<string, string> = { draft: "bg-gray-200 text-gray-600", scheduled: "bg-warning/20 text-warning", published: "bg-success/20 text-success" };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-shimmer"></div>
        <div className="space-y-4">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-card p-5 h-20 animate-shimmer"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between animate-fadeIn">
        <div>
          <h1 className="text-2xl font-bold">Conteudos</h1>
          <p className="text-gray-sec mt-1">Gerencie seus conteudos</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-hover flex items-center gap-2">
          <Plus size={18} /> Novo Conteudo
        </button>
      </div>

      {contents.length === 0 ? (
        <div className="bg-white rounded-xl shadow-card p-12 text-center animate-scaleIn">
          <FileText size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-sec">Nenhum conteudo criado ainda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contents.map((content, index) => {
            const Icon = typeIcons[content.type] || FileText;
            return (
              <div 
                key={content.id} 
                className="bg-white rounded-xl shadow-card p-5 flex items-center justify-between card-hover animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{content.title}</h3>
                    <p className="text-sm text-gray-sec">{content.description || "Sem descricao"}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[content.status]}`}>
                  {statusLabels[content.status]}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Novo Conteudo</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-sec hover:text-dark transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titulo</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Descricao</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none h-24 resize-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="video">Video</option>
                    <option value="post">Post</option>
                    <option value="image">Imagem</option>
                    <option value="podcast">Podcast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="scheduled">Agendado</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>
              <button type="submit" disabled={isSaving} className="w-full btn btn-primary btn-hover py-3 disabled:opacity-50">
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                ) : "Salvar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
