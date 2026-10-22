import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Grenze_Gotisch } from "next/font/google";
import "./globals.css";

// The app's faces: Typestar OCR for content, Departure Mono (MIT) for
// 11px legends, Grenze Gotisch only for the wordmark.
const typestar = localFont({
  src: "./fonts/Typestar-OCR.woff2",
  variable: "--font-typestar",
  display: "swap",
});

const departure = localFont({
  src: "./fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure",
  display: "swap",
});

const grenzeGotisch = Grenze_Gotisch({
  variable: "--font-grenze-gotisch",
  subsets: ["latin"],
  weight: "600",
});

const description =
  "Lirah is a desktop workspace for CLI coding agents. Claude Code or opencode runs in a real terminal; around it you choose which files the agent sees, how it uses each one, and what that costs in tokens. Free and open source.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lira.dev"),
  title: "Lirah: a workspace for CLI coding agents",
  description,
  keywords: [
    "Claude Code",
    "opencode",
    "CLI agents",
    "context management",
    "token efficiency",
    "agent workspace",
    "developer tools",
  ],
  openGraph: {
    title: "Lirah: a workspace for CLI coding agents",
    description,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lirah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lirah: a workspace for CLI coding agents",
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#131a1d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${typestar.variable} ${departure.variable} ${grenzeGotisch.variable}`}>
      <body>{children}</body>
    </html>
  );
}
