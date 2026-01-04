"use client";

import { useState, useEffect } from "react";
import { User, Bell, Palette, Shield, Save, Check, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setProfile({
          name: user.user_metadata?.name || "",
          email: user.email || "",
        });
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    const { error } = await supabase.auth.updateUser({
      data: { name: profile.name }
    });

    setIsSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "notifications", label: "Notificacoes", icon: Bell },
    { id: "appearance", label: "Aparencia", icon: Palette },
    { id: "security", label: "Seguranca", icon: Shield },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Settings size={32} />
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-1">Preferencias</p>
            <h1 className="text-4xl font-bold tracking-tight">Configuracoes</h1>
            <p className="text-white/80 mt-2 font-medium">Gerencie sua conta e preferencias</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 bg-white rounded-2xl shadow-card p-4 h-fit border border-gray-100">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-card p-8 border border-gray-100">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Informacoes do Perfil</h2>
                <p className="text-gray-500 text-sm mt-1">Atualize suas informacoes pessoais</p>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-3.5 bg-gray-100 border border-gray-200 rounded-xl outline-none text-gray-500 cursor-not-allowed font-medium"
                  />
                  <p className="text-xs text-gray-500 mt-2">O email nao pode ser alterado</p>
                </div>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                >
                  {saved ? (
                    <>
                      <Check size={18} /> Salvo!
                    </>
                  ) : isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={18} /> Salvar alteracoes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Notificacoes</h2>
                <p className="text-gray-500 text-sm mt-1">Gerencie suas preferencias de notificacao</p>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: "Novos recursos", desc: "Receba atualizacoes sobre novos recursos", checked: true },
                  { title: "Dicas de conteudo", desc: "Receba sugestoes personalizadas", checked: true },
                  { title: "Relatorios semanais", desc: "Resumo semanal de performance", checked: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                      <div className="w-12 h-7 bg-gray-300 peer-focus:ring-2 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-purple-600 transition-all"></div>
                      <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Aparencia</h2>
                <p className="text-gray-500 text-sm mt-1">Personalize a interface do CriatIA</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="p-6 border-2 border-purple-500 bg-purple-50 rounded-2xl text-center transition-all">
                  <div className="w-full h-24 bg-white border border-gray-200 rounded-xl mb-4 flex items-center justify-center shadow-sm">
                    <span className="text-3xl">☀️</span>
                  </div>
                  <p className="font-semibold text-gray-800">Claro</p>
                  <p className="text-xs text-purple-600 font-medium mt-1">Ativo</p>
                </button>
                
                <button className="p-6 border-2 border-gray-200 bg-white rounded-2xl text-center hover:border-purple-300 transition-all">
                  <div className="w-full h-24 bg-gray-800 rounded-xl mb-4 flex items-center justify-center shadow-sm">
                    <span className="text-3xl">🌙</span>
                  </div>
                  <p className="font-semibold text-gray-800">Escuro</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">Em breve</p>
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Seguranca</h2>
                <p className="text-gray-500 text-sm mt-1">Proteja sua conta</p>
              </div>
              
              <div className="space-y-4">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-semibold text-gray-800 mb-1">Alterar senha</p>
                  <p className="text-sm text-gray-500 mb-4">Receba um email para redefinir sua senha</p>
                  <button className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                    Enviar email
                  </button>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="font-semibold text-gray-800 mb-1">Autenticacao em dois fatores</p>
                  <p className="text-sm text-gray-500 mb-4">Adicione uma camada extra de seguranca</p>
                  <span className="text-sm text-amber-600 font-semibold bg-amber-100 px-3 py-1.5 rounded-lg">Em breve</span>
                </div>

                <div className="p-5 bg-red-50 rounded-xl border border-red-100">
                  <p className="font-semibold text-red-600 mb-1">Zona de perigo</p>
                  <p className="text-sm text-gray-500 mb-4">Excluir permanentemente sua conta</p>
                  <button className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors">
                    Excluir conta
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
