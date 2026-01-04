"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-dark rounded-2xl shadow-card p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={28} />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Bem-vindo de volta!</h1>
          <p className="text-gray-sec mt-2">Entre na sua conta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Email</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec"><Mail size={18} /></div>
              <input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-section dark:bg-gray-800 border border-transparent focus:border-primary rounded-xl text-dark dark:text-white placeholder:text-gray-sec outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Senha</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec"><Lock size={18} /></div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3 bg-gray-section dark:bg-gray-800 border border-transparent focus:border-primary rounded-xl text-dark dark:text-white placeholder:text-gray-sec outline-none transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-sec hover:text-dark dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-sec">Lembrar de mim</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">Esqueceu a senha?</Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Entrar <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-sec">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-primary hover:underline font-medium">Cadastre-se grátis</Link>
        </p>
      </div>
    </div>
  );
}
