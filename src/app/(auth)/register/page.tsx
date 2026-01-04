"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { name: formData.name } }
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }
    setSuccess(true);
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-dark rounded-2xl shadow-card p-8 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-success" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-dark dark:text-white mb-2">Conta criada!</h1>
          <p className="text-gray-sec mb-6">Enviamos um link de confirmacao para <strong>{formData.email}</strong></p>
          <Link href="/login" className="btn btn-primary">Ir para o login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-dark rounded-2xl shadow-card p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Crie sua conta</h1>
          <p className="text-gray-sec mt-2">Comece a criar conteudo incrivel com IA</p>
        </div>

        {error && <div className="mb-4 p-3 bg-danger/10 rounded-xl text-danger text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Nome</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec" size={18} />
              <input type="text" placeholder="Seu nome" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-gray-section rounded-xl outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec" size={18} />
              <input type="email" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-gray-section rounded-xl outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec" size={18} />
              <input type={showPassword ? "text" : "password"} placeholder="********" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full pl-11 pr-12 py-3 bg-gray-section rounded-xl outline-none" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-sec">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark dark:text-white mb-2">Confirmar senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-sec" size={18} />
              <input type={showPassword ? "text" : "password"} placeholder="********" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-gray-section rounded-xl outline-none" required />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.acceptTerms} onChange={(e) => setFormData({...formData, acceptTerms: e.target.checked})} className="w-4 h-4" />
            <span className="text-sm text-gray-sec">Aceito os termos de uso</span>
          </label>

          <button type="submit" disabled={isLoading || !isPasswordValid || !passwordsMatch || !formData.acceptTerms} className="w-full btn btn-primary py-3.5 disabled:opacity-70">
            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : "Criar conta"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-sec">Ja tem conta? <Link href="/login" className="text-primary">Fazer login</Link></p>
      </div>
    </div>
  );
}
