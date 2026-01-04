"use client";

import { useState, useEffect } from "react";
import { Plus, FileText, Video, Image, Mic, Edit, Trash2, Calendar } from "lucide-react";
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
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "video",
    status: "draft",
  });

  const typeIcons: Record<string, any> = {
    video: Video,
    post: FileText,
    image: Image,
    podcast: Mic,
  };

  const statusColors: Record<string, string> = {
    draft: "bg-gray-200 text-gray-600",
    scheduled: "bg-warning/20 text-warning",
    published: "bg-success/20 text-success",
  };

  const statusLabels: Record<string, string> = {
    draft: "Rascunho",
    scheduled: "Agendado",
    published: "Publicado",
  };

  const loadContents = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const res = await fetch("/api/content", {
      headers: { "x-user-id": user.id },
    });
    const data = await res.json();
    setContents(data);
  };

  useEffect(() => {
    loadContents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await fetch("/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": user.id,
      },
      body: JSON.stringify(formData),
    });

    setFormData({ title: "", description: "", type: "video", status: "draft" });
    setShowForm(false);
    setIsLoading(false);
    loadContents();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Meus Conteudos</h1>
          <p className="text-gray-sec mt-1">Gerencie seus posts e videos</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Novo Conteudo
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-dark rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Criar Novo Conteudo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titulo</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none"
                placeholder="Titulo do conteudo"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descricao</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none h-24"
                placeholder="Descreva seu conteudo"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tipo</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none"
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
                  className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none"
                >
                  <option value="draft">Rascunho</option>
                  <option value="scheduled">Agendado</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={isLoading} className="btn btn-primary">
                {isLoading ? "Salvando..." : "Salvar"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn bg-gray-200">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {contents.length === 0 ? (
          <div className="bg-white dark:bg-dark rounded-xl shadow-card p-12 text-center">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-dark dark:text-white">Nenhum conteudo ainda</h3>
            <p className="text-gray-sec mt-1">Clique em Novo Conteudo para comecar</p>
          </div>
        ) : (
          contents.map((content) => {
            const Icon = typeIcons[content.type] || FileText;
            return (
              <div key={content.id} className="bg-white dark:bg-dark rounded-xl shadow-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-dark dark:text-white">{content.title}</h3>
                  <p className="text-sm text-gray-sec">{content.description || "Sem descricao"}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[content.status]}`}>
                  {statusLabels[content.status]}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
