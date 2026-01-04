# 🎨 CriatIA

**Plataforma para Criadores de Conteúdo** - Gerencie suas redes sociais, crie conteúdo com IA e acompanhe seus resultados.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

---

## 🚀 Como Rodar o Projeto

### Opção 1: Localmente (se tiver Node.js instalado)

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:3000
```

### Opção 2: GitHub Codespaces (recomendado - sem instalar nada)

1. Suba o projeto para o GitHub
2. Clique no botão verde **"Code"** > **"Codespaces"** > **"Create codespace"**
3. Aguarde carregar e rode `npm install && npm run dev`

### Opção 3: StackBlitz (100% no navegador)

1. Acesse [stackblitz.com](https://stackblitz.com)
2. Importe do GitHub ou faça upload do projeto

---

## 📁 Estrutura do Projeto

```
criatia/
├── src/
│   ├── app/                    # Páginas (App Router)
│   │   ├── dashboard/          # Dashboard principal
│   │   ├── platforms/          # YouTube, Instagram, TikTok
│   │   ├── content/            # Criar, biblioteca, calendário
│   │   ├── ai/                 # Ideias, scripts, tendências
│   │   └── (auth)/             # Login, registro
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── layout/             # Sidebar, Header
│   │   ├── ui/                 # Cards, Buttons, etc
│   │   └── charts/             # Gráficos (ApexCharts)
│   │
│   ├── lib/                    # Utilitários
│   └── styles/                 # CSS global
│
├── public/                     # Arquivos estáticos
├── tailwind.config.ts          # Configuração do Tailwind
└── package.json
```

---

## 🎨 Design

O design é baseado no template **Geex** (Bootstrap Admin Dashboard), adaptado para React/Next.js com Tailwind CSS.

### Cores principais:
- **Primary:** `#AB54DB` (roxo)
- **Success:** `#00A389` (verde)
- **Warning:** `#FFBB54` (amarelo)
- **Danger:** `#FF5B5B` (vermelho)
- **Info:** `#58CDFF` (azul)

---

## 📦 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **ApexCharts** - Gráficos interativos
- **Lucide React** - Ícones

---

## 🔜 Próximos Passos

1. **Autenticação** - Login/Registro com NextAuth
2. **Banco de dados** - Prisma + PostgreSQL
3. **APIs de redes sociais** - YouTube, Instagram, TikTok
4. **Integração com IA** - OpenAI/Claude para geração de conteúdo
5. **Calendário de publicações** - Agendamento de posts

---

## 🌐 Deploy Gratuito

### Vercel (recomendado)

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Conecte seu GitHub
3. Importe o repositório
4. Deploy automático!

### Outras opções gratuitas:
- Netlify
- Railway
- Render

---

## 📞 Suporte

Dúvidas? Me chame novamente no Claude! 

---

**Feito com 💜 para criadores de conteúdo**
