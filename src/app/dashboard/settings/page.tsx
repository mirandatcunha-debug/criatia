"use client";

import { useState, useEffect } from "react";
import { User, Bell, Palette, Shield, Save, Check } from "lucide-react";
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
    <div className="space-y-6">
      <div className="animate-fadeIn">
        <h1 className="text-2xl font-bold">Configuracoes</h1>
        <p className="text-gray-sec mt-1">Gerencie sua conta e preferencias</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 bg-white rounded-xl shadow-card p-4 h-fit animate-fadeIn delay-100">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-gray-sec hover:bg-gray-section"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-card p-6 animate-fadeIn delay-200">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Informacoes do Perfil</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none opacity-60 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-sec mt-1">O email nao pode ser alterado</p>
                </div>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn btn-primary btn-hover flex items-center gap-2"
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
              <h2 className="text-lg font-semibold">Preferencias de Notificacoes</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-section rounded-xl">
                  <div>
                    <p className="font-medium">Novos recursos</p>
                    <p className="text-sm text-gray-sec">Receba atualizacoes sobre novos recursos</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:bg-primary transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-section rounded-xl">
                  <div>
                    <p className="font-medium">Dicas de conteudo</p>
                    <p className="text-sm text-gray-sec">Receba sugestoes personalizadas</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:bg-primary transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-section rounded-xl">
                  <div>
                    <p className="font-medium">Relatorios semanais</p>
                    <p className="text-sm text-gray-sec">Resumo semanal de performance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:bg-primary transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Aparencia</h2>
              
              <div className="space-y-4">
                <p className="text-gray-sec">Escolha o tema da interface</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border-2 border-primary bg-white rounded-xl text-center transition-all">
                    <div className="w-full h-20 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">☀️</span>
                    </div>
                    <p className="font-medium">Claro</p>
                  </button>
                  
                  <button className="p-4 border-2 border-gray-200 bg-white rounded-xl text-center hover:border-primary transition-all">
                    <div className="w-full h-20 bg-gray-800 rounded-lg mb-2 flex items-center justify-center">
                      <span className="text-2xl">🌙</span>
                    </div>
                    <p className="font-medium">Escuro</p>
                  </button>
                </div>
                
                <p className="text-sm text-gray-sec">Em breve: modo escuro completo!</p>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Seguranca</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-section rounded-xl">
                  <p className="font-medium mb-2">Alterar senha</p>
                  <p className="text-sm text-gray-sec mb-4">Receba um email para redefinir sua senha</p>
                  <button className="btn bg-gray-200 text-dark hover:bg-gray-300 transition-colors">
                    Enviar email de redefinicao
                  </button>
                </div>

                <div className="p-4 bg-gray-section rounded-xl">
                  <p className="font-medium mb-2">Autenticacao em dois fatores</p>
                  <p className="text-sm text-gray-sec mb-4">Adicione uma camada extra de seguranca</p>
                  <span className="text-sm text-warning font-medium">Em breve</span>
                </div>

                <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl">
                  <p className="font-medium text-danger mb-2">Zona de perigo</p>
                  <p className="text-sm text-gray-sec mb-4">Excluir permanentemente sua conta e todos os dados</p>
                  <button className="btn bg-danger text-white hover:bg-danger/80 transition-colors">
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
