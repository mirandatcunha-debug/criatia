"use client";

import Link from "next/link";
import { Zap, Play, BarChart3, Calendar, Sparkles, CheckCircle, Youtube, Instagram, Music2, ArrowRight, Star } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: Sparkles,
      title: "IA Assistente",
      description: "Gere ideias, scripts e hashtags com inteligencia artificial",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: Calendar,
      title: "Calendario Editorial",
      description: "Organize e agende seus conteudos em todas as plataformas",
      gradient: "from-fuchsia-500 to-pink-600",
    },
    {
      icon: BarChart3,
      title: "Analytics Unificado",
      description: "Acompanhe metricas de YouTube, Instagram e TikTok em um so lugar",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const steps = [
    { number: "01", title: "Crie sua conta", description: "Cadastro rapido e gratuito em menos de 1 minuto" },
    { number: "02", title: "Conecte suas redes", description: "Integre YouTube, Instagram e TikTok facilmente" },
    { number: "03", title: "Comece a criar", description: "Use a IA para gerar conteudo e acompanhe seus resultados" },
  ];

  const testimonials = [
    { name: "Ana Silva", role: "YouTuber", text: "Triplicou minha produtividade! A IA gera ideias incriveis.", avatar: "A" },
    { name: "Pedro Costa", role: "Influencer", text: "Finalmente consigo ver todas as metricas em um lugar so.", avatar: "P" },
    { name: "Maria Santos", role: "Content Creator", text: "O calendario editorial mudou minha organizacao.", avatar: "M" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Zap className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-800">
                Criat<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">IA</span>
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 font-medium hover:text-gray-800 transition-colors">
                Entrar
              </Link>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Comecar Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles size={16} />
                Potencializado por IA
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Crie conteudo
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500"> incrivel </span>
                para suas redes
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A plataforma completa para criadores de conteudo. Gere ideias com IA, organize seu calendario e acompanhe suas metricas em um so lugar.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/register" 
                  className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Comecar Gratis <ArrowRight size={20} />
                </Link>
                <button className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-gray-200 text-gray-700 hover:border-violet-300 hover:text-violet-600 transition-all">
                  <Play size={20} fill="currentColor" /> Ver Demo
                </button>
              </div>
              
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gray-100">
                <div className="flex -space-x-3">
                  {["A", "B", "C", "D"].map((letter, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm border-2 border-white">
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-sm text-gray-600">+1.000 criadores ativos</p>
                </div>
              </div>
            </div>
            
            {/* Right - Mockup/Animation Space */}
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-gray-200 shadow-2xl">
                {/* Placeholder para sua animação/imagem */}
                <div className="aspect-video bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-violet-300">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                    <p className="text-violet-600 font-semibold">Espaco para sua animacao</p>
                    <p className="text-violet-400 text-sm mt-1">ou mockup do dashboard</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <TrendingUp size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Engajamento</p>
                      <p className="text-lg font-bold text-gray-800">+127%</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                      <Sparkles size={20} className="text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Ideias geradas</p>
                      <p className="text-lg font-bold text-gray-800">+50 hoje</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-500 font-medium mb-8">Integrado com suas plataformas favoritas</p>
          <div className="flex justify-center items-center gap-12">
            <div className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors">
              <Youtube size={40} />
              <span className="text-xl font-semibold">YouTube</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 hover:text-pink-500 transition-colors">
              <Instagram size={40} />
              <span className="text-xl font-semibold">Instagram</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 hover:text-gray-800 transition-colors">
              <Music2 size={40} />
              <span className="text-xl font-semibold">TikTok</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tudo que voce precisa para crescer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ferramentas poderosas para criar, organizar e analisar seu conteudo</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como funciona</h2>
            <p className="text-xl text-white/80">Comece a criar conteudo incrivel em 3 passos simples</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">O que dizem nossos usuarios</h2>
            <p className="text-xl text-gray-600">Criadores que ja transformaram sua producao de conteudo</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Pronto para transformar sua criacao de conteudo?</h2>
          <p className="text-xl text-gray-600 mb-8">Junte-se a milhares de criadores que ja usam o CriatIA</p>
          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all"
          >
            Comecar Gratis Agora <ArrowRight size={20} />
          </Link>
          <p className="text-gray-500 text-sm mt-4">Sem cartao de credito. Cancele quando quiser.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold">
                Criat<span className="text-violet-400">IA</span>
              </span>
            </div>
            
            <div className="flex items-center gap-8 text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Termos</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
              <Link href="#" className="hover:text-white transition-colors">Contato</Link>
            </div>
            
            <p className="text-gray-500 text-sm">© 2026 CriatIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TrendingUp(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
      <polyline points="16 7 22 7 22 13"></polyline>
    </svg>
  );
}
