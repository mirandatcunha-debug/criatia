"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError("Email ou senha incorretos");
      setIsLoading(false);
      return;
    }

    if (data.session && data.user) {
      document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=3600`;
      
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || "",
        }),
      });
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-dark rounded-2xl shadow-card p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Bem-vindo de volta!</h1>
          <p className="text-gray-sec mt-2">Entre na sua conta para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-danger/10 rounded-xl text-danger text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec" size={18} />
              <input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-section rounded-xl outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3 bg-gray-section rounded-xl outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-sec"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full btn btn-primary py-3.5 disabled:opacity-70">
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : "Entrar"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-sec">
          Nao tem conta? <Link href="/register" className="text-primary">Cadastre-se gratis</Link>
        </p>
      </div>
    </div>
  );
}
