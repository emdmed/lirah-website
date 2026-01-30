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
  title: "Lirah - A GUI for Claude Code",
  description:
    "A native desktop GUI for Claude Code built with Tauri, React, and xterm.js. Featuring file context selection, prompt templates, and bidirectional terminal sync.",
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
