import type { Metadata } from "next";
import { Inconsolata, Grenze_Gotisch } from "next/font/google";
import "./globals.css";

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

const grenzeGotisch = Grenze_Gotisch({
  variable: "--font-grenze-gotisch",
  subsets: ["latin"],
  weight: "600",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lira.dev"),
  title: "Lirah - Context Management for CLI Agents | Token-Efficient LLM Agent UI",
  description:
    "Stop wasting tokens on bloated prompts. Lirah is a developer-first LLM agent UI with smart file selection, prompt scaffolding, and context management. Run CLI agents longer for less. Built for software engineers using Claude Code and agentic AI workflows.",
  keywords: [
    "CLI agents",
    "Claude Code GUI",
    "LLM agent UI",
    "context management",
    "token efficiency",
    "prompt optimization",
    "agentic dev workflows",
    "developer tools",
    "AI coding assistant",
  ],
  openGraph: {
    title: "Lirah - Context Management for CLI Agents",
    description: "Stop wasting tokens on bloated prompts. Smart file selection, prompt scaffolding, and workflow optimization for LLM power users.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lirah - Context Management for CLI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lirah - Context Management for CLI Agents",
    description: "Stop wasting tokens on bloated prompts. Smart file selection, prompt scaffolding, and workflow optimization for LLM power users.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inconsolata.variable} ${grenzeGotisch.variable} font-[family-name:var(--font-inconsolata)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
