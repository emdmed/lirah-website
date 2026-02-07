"use client";

import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-dashed border-white/20 bg-[#09090b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-[family-name:var(--font-grenze-gotisch)] text-xl sm:text-2xl">Lirah</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href="#problem"
            className="text-sm text-[#a6a6a6] transition-colors hover:text-white"
          >
            Problem
          </a>
          <a
            href="#features"
            className="text-sm text-[#a6a6a6] transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#workflows"
            className="text-sm text-[#a6a6a6] transition-colors hover:text-white"
          >
            Workflows
          </a>
          <a
            href="/blog"
            className="text-sm text-[#a6a6a6] transition-colors hover:text-white"
          >
            Blog
          </a>
          <a
            href="#download"
            className="flex h-9 items-center gap-2 rounded-lg bg-[#7a9e98] px-4 text-sm font-medium text-[#09090b] transition-colors hover:bg-[#a0b8b3]"
          >
            Download
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden flex items-center justify-center p-2 text-white transition-colors hover:text-[#a6a6a6]"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-dashed border-white/20 bg-[#09090b]/95">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#problem"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm text-[#a6a6a6] transition-colors hover:text-white py-2"
            >
              Problem
            </a>
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm text-[#a6a6a6] transition-colors hover:text-white py-2"
            >
              Features
            </a>
            <a
              href="#workflows"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm text-[#a6a6a6] transition-colors hover:text-white py-2"
            >
              Workflows
            </a>
            <a
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm text-[#a6a6a6] transition-colors hover:text-white py-2"
            >
              Blog
            </a>
            <a
              href="#download"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg bg-[#7a9e98] px-4 py-2 text-sm font-medium text-[#09090b] transition-colors hover:bg-[#a0b8b3] w-fit"
            >
              Download
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
