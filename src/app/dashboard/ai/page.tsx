"use client";

import { useState } from "react";
import { Sparkles, Lightbulb, FileText, Hash, Send, Copy, Check, Zap } from "lucide-react";

export default function AIPage() {
  const [activeTab, setActiveTab] = useState("ideas");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: "ideas", label: "Ideias", icon: Lightbulb, gradient: "from-amber-500 to-orange-600" },
    { id: "script", label: "Scripts", icon: FileText, gradient: "from-violet-500 to-purple-600" },
    { id: "hashtags", label: "Hashtags", icon: Hash, gradient: "from-fuchsia-500 to-pink-600" },
  ];

  const placeholders: Record<string, string> = {
    ideas: "Ex: Quero ideias de videos sobre fitness para iniciantes",
    script: "Ex: Crie um script para video sobre como acordar cedo",
    hashtags: "Ex: Hashtags para post sobre receitas saudaveis",
  };

  const generateContent = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResult("");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      ideas: `Aqui estao 5 ideias de conteudo baseadas no seu tema:

1. Tutorial Completo - Guia passo a passo para iniciantes
2. Mitos vs Verdades - Derrube os mitos mais comuns do seu nicho
3. Minha Rotina - Mostre sua rotina diaria relacionada ao tema
4. Erros Comuns - Os 7 erros que iniciantes cometem
5. Antes e Depois - Resultados reais e transformacoes

Dica: Comece pelo conteudo que voce tem mais conhecimento!`,

      script: `ROTEIRO DE VIDEO

[HOOK - 0:00 a 0:05]
"Voce sabia que 90% das pessoas erram nisso?"

[INTRODUCAO - 0:05 a 0:20]
Apresente o problema e prometa a solucao

[CONTEUDO PRINCIPAL - 0:20 a 2:00]
- Ponto 1: Explique o primeiro conceito
- Ponto 2: De um exemplo pratico
- Ponto 3: Mostre como aplicar

[CTA - 2:00 a 2:15]
"Se voce gostou, deixa o like e se inscreve!"

[ENCERRAMENTO - 2:15 a 2:30]
Despedida e preview do proximo video`,

      hashtags: `Hashtags sugeridas:

Principais (alta concorrencia):
#fitness #saude #bemestar #vidasaudavel #treino

Nicho (media concorrencia):
#fitnessiniciante #treinoemcasa #dicasdesaude #emagrecimento

Long-tail (baixa concorrencia):
#fitnessbrasil #treinofuncional #saborosaesaudavel #receitafit

Dica: Use 20-25 hashtags, misturando os 3 tipos!`,
    };

    setResult(responses[activeTab]);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Zap size={32} />
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium tracking-wide uppercase mb-1">Inteligencia Artificial</p>
            <h1 className="text-4xl font-bold tracking-tight">IA Assistente</h1>
            <p className="text-white/80 mt-2 font-medium">Gere ideias, scripts e hashtags em segundos</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setResult(""); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === tab.id 
                ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg` 
                : "bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-3">O que voce precisa?</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholders[activeTab]}
          className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none h-32 resize-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all font-medium"
        />
        
        <button
          onClick={generateContent}
          disabled={isLoading || !prompt.trim()}
          className={`mt-4 bg-gradient-to-r ${activeTabData?.gradient} text-white px-6 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Sparkles size={18} /> Gerar com IA
            </>
          )}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white rounded-2xl shadow-card p-6 border border-gray-100 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Resultado</h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-500" /> Copiado!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copiar
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-medium leading-relaxed">{result}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
