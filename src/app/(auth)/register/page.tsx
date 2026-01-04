"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordValid || !passwordsMatch || !formData.acceptTerms) return;
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
          <h1 className="text-2xl font-bold text-dark dark:text-white">Crie sua conta</h1>
          <p className="text-gray-sec mt-2">Comece a criar conteúdo incrível com IA</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Nome completo</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec"><User size={18} /></div>
              <input type="text" placeholder="Seu nome" value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-section dark:bg-gray-800 border border-transparent focus:border-primary rounded-xl text-dark dark:text-white placeholder:text-gray-sec outline-none transition-colors" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Email</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec"><Mail size={18} /></div>
              <input type="email" placeholder="seu@email.com" value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-section dark:bg-gray-800 border border-transparent focus:border-primary rounded-xl text-dark dark:text-white placeholder:text-gray-sec outline-none transition-colors" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Senha</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec"><Lock size={18} /></div>
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-11 pr-12 py-3 bg-gray-section dark:bg-gray-800 border border-transparent focus:border-primary rounded-xl text-dark dark:text-white placeholder:text-gray-sec outline-none transition-colors" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-sec hover:text-dark dark:hover:text-white transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className={`flex items-center gap-1.5 text-xs ${passwordChecks.length ? "text-success" : "text-gray-sec"}`}><Check size={14} /><span>8+ caracteres</span></div>
                <div className={`flex items-center gap-1.5 text-xs ${passwordChecks.uppercase ? "text-success" : "text-gray-sec"}`}><Check size={14} /><span>Letra maiúscula</span></div>
                <div className={`flex items-center gap-1.5 text-xs ${passwordChecks.lowercase ? "text-success" : "text-gray-sec"}`}><Check size={14} /><span>Letra minúscula</span></div>
                <div className={`flex items-center gap-1.5 text-xs ${passwordChecks.number ? "text-success" : "text-gray-sec"}`}><Check size={14} /><span>Número</span></div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Confirmar senha</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec"><Lock size={18} /></div>
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full pl-11 pr-4 py-3 bg-gray-section dark:bg-gray-800 border rounded-xl text-dark dark:text-white placeholder:text-gray-sec outline-none transition-colors ${formData.confirmPassword ? (passwordsMatch ? "border-success" : "border-danger") : "border-transparent focus:border-primary"}`} required />
            </div>
            {formData.confirmPassword && !passwordsMatch && <p className="mt-1 text-xs text-danger">As senhas não coincidem</p>}
          </div>

          <div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm text-gray-sec">Eu concordo com os <Link href="/terms" className="text-primary hover:underline">Termos de Uso</Link> e <Link href="/privacy" className="text-primary hover:underline">Política de Privacidade</Link></span>
            </label>
          </div>

          <button type="submit" disabled={isLoading || !isPasswordValid || !passwordsMatch || !formData.acceptTerms}
            className="w-full btn btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-70 disabled:cursor-not-allowed">
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Criar conta <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-sec">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">Faça login</Link>
        </p>
      </div>
    </div>
  );
}
