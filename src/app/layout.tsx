import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CriatIA - Plataforma para Criadores de Conteúdo",
  description:
    "Gerencie suas redes sociais, crie conteúdo com IA e acompanhe seus resultados em um só lugar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
