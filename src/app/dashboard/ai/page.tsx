"use client";

import { useState } from "react";
import { Sparkles, Lightbulb, FileText, Hash, Send, Copy, Check } from "lucide-react";

export default function AIPage() {
  const [activeTab, setActiveTab] = useState("ideas");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: "ideas", label: "Ideias", icon: Lightbulb },
    { id: "script", label: "Scripts", icon: FileText },
    { id: "hashtags", label: "Hashtags", icon: Hash },
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

1. **Tutorial Completo** - Guia passo a passo para iniciantes
2. **Mitos vs Verdades** - Derrube os mitos mais comuns do seu nicho
3. **Minha Rotina** - Mostre sua rotina diaria relacionada ao tema
4. **Erros Comuns** - Os 7 erros que iniciantes cometem
5. **Antes e Depois** - Resultados reais e transformacoes

Dica: Comece pelo conteudo que voce tem mais conhecimento!`,

      script: `**ROTEIRO DE VIDEO**

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

      hashtags: `**Hashtags sugeridas:**

Principais (alta concorrencia):
#fitness #saude #bemestar #vidasaudavel #treino

Nicho (media concorrencia):
#fitnessiniciante #treinoemcasa #dicasdesaude #emagrecimento

Long-tail (baixa concorrencia):
#fitnessbrasil #treinofuncional #saborosaesaudavel #receitafit

**Dica:** Use 20-25 hashtags, misturando os 3 tipos!`,
    };

    setResult(responses[activeTab]);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fadeIn">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-primary" /> IA Assistente
        </h1>
        <p className="text-gray-sec mt-1">Gere ideias, scripts e hashtags com IA</p>
      </div>

      <div className="bg-white rounded-xl shadow-card p-6 card-hover animate-fadeIn delay-100">
        <div className="flex gap-2 mb-6">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setResult(""); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all animate-fadeIn ${
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "bg-gray-section text-gray-sec hover:bg-gray-200"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="animate-fadeIn delay-300">
            <label className="block text-sm font-medium mb-2">O que voce precisa?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={placeholders[activeTab]}
              className="w-full px-4 py-3 bg-gray-section rounded-xl outline-none h-24 resize-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <button
            onClick={generateContent}
            disabled={isLoading || !prompt.trim()}
            className="btn btn-primary btn-hover flex items-center gap-2 disabled:opacity-50 animate-fadeIn delay-400"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Send size={18} /> Gerar com IA
              </>
            )}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-gray-section rounded-xl relative animate-scaleIn">
            <button
              onClick={copyToClipboard}
              className="absolute top-3 right-3 p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {copied ? <Check size={18} className="text-success" /> : <Copy size={18} className="text-gray-sec" />}
            </button>
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
