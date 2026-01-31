"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Terminal,
  FolderTree,
  FileText,
  ArrowRight,
  Pencil,
  Ban,
  BookOpen,
  RefreshCw,
  Rocket,
  Brain,
  Puzzle,
  Monitor,
  GitBranch,
  Bug,
  Gauge,
  FileSearch,
  GitPullRequest,
  FileCode,
  Settings,
  Menu,
  X,
} from "lucide-react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-dashed border-white/20 bg-[#09090b]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <span className="font-[family-name:var(--font-grenze-gotisch)] text-xl sm:text-2xl">Lirah</span>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6">
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
              href="https://github.com/emdmed/lirah"
              className="flex h-9 items-center gap-2 rounded-lg bg-[#14b8a6] px-4 text-sm font-medium text-[#09090b] transition-colors hover:bg-[#5eead4]"
            >
              Get Started
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
                href="https://github.com/emdmed/lirah"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg bg-[#14b8a6] px-4 py-2 text-sm font-medium text-[#09090b] transition-colors hover:bg-[#5eead4] w-fit"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Vertical guide lines */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="mx-auto h-full max-w-7xl">
          <div className="flex h-full justify-between">
            <div className="h-full w-px border-l border-dashed border-white/10" />
            <div className="h-full w-px border-l border-dashed border-white/10" />
          </div>
        </div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-16 sm:pb-24 pt-24 sm:pt-32">
          {/* Glow effect */}
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] sm:h-[600px] sm:w-[800px] -translate-x-1/2 rounded-full bg-[#14b8a6]/15 blur-[120px]" />

          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Mobile-first layout: Title centered, Description + CTA below */}
            <div className="text-center lg:text-left lg:grid lg:items-center lg:gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Title */}
              <div className="flex justify-center lg:justify-start items-center mb-8 lg:mb-0">
                <h1 className="font-[family-name:var(--font-grenze-gotisch)] text-6xl sm:text-8xl lg:text-[9rem] xl:text-[12rem] 2xl:text-[15rem] leading-none text-white">
                  Lirah
                </h1>
              </div>

              {/* Description + CTA */}
              <div>
                <p className="mb-4 text-xl sm:text-2xl font-semibold text-white">
                  A native desktop app for CLI coding agents
                </p>
                <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed text-[#a6a6a6] max-w-xl mx-auto lg:mx-0">
                  Keep your files, prompts, and terminal perfectly in sync—so you can focus on shipping, not wrangling context.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                  <a
                    href="https://github.com/emdmed/lirah"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#14b8a6] px-6 text-base font-medium text-[#09090b] transition-colors hover:bg-[#5eead4]"
                  >
                    View on GitHub
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#features"
                    className="inline-flex h-12 items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 px-6 text-base font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
                  >
                    See Features
                  </a>
                </div>
              </div>
            </div>

            {/* Product Screenshot */}
            <div className="mt-8 sm:mt-16">
              <div className="relative">
                <div className="absolute -left-2 -top-2 sm:-left-3 sm:-top-3 h-4 w-4 sm:h-6 sm:w-6 border-l-2 border-t-2 border-dashed border-white/30" />
                <div className="absolute -right-2 -top-2 sm:-right-3 sm:-top-3 h-4 w-4 sm:h-6 sm:w-6 border-r-2 border-t-2 border-dashed border-white/30" />

                <div className="relative max-h-[300px] sm:max-h-[400px] overflow-hidden rounded-xl bg-[#09090b]">
                  <Image
                    src="/lirah-screenshot.png"
                    alt="Lirah - A Smarter GUI for CLI Coding Agents"
                    width={1200}
                    height={800}
                    className="w-full object-cover object-top"
                    priority
                  />
                  {/* Gradient overlay to fade bottom half */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-40% via-[#09090b]/50 via-70% to-[#09090b]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code with Context Section */}
        <section id="features" className="border-t border-dashed border-white/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
              {/* Content */}
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#14b8a6]">
                  File Context
                </p>
                <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
                  Code with Context
                  <span className="block text-[#969696]">(Without the Hassle)</span>
                </h2>
                <p className="mb-6 sm:mb-8 text-base sm:text-lg text-[#969696]">
                  AI agents are only as good as the context you give them. Lirah makes
                  that effortless.
                </p>

                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#14b8a6]/40 bg-[#14b8a6]/10">
                      <FolderTree className="h-3 w-3 text-[#14b8a6]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#a6a6a6]">
                      Select files directly from your project tree
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#14b8a6]/40 bg-[#14b8a6]/10">
                      <FileText className="h-3 w-3 text-[#14b8a6]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#a6a6a6]">
                      Tell the agent exactly how to use each file
                    </span>
                  </li>
                </ul>

                {/* File modes */}
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/5 px-3 py-2">
                    <Pencil className="h-4 w-4 text-[#14b8a6]" />
                    <span className="text-sm text-[#14b8a6]">Modify</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#f6543e]/30 bg-[#f6543e]/5 px-3 py-2">
                    <Ban className="h-4 w-4 text-[#f6543e]" />
                    <span className="text-sm text-[#f6543e]">Do not modify</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#a78bfa]/30 bg-[#a78bfa]/5 px-3 py-2">
                    <BookOpen className="h-4 w-4 text-[#a78bfa]" />
                    <span className="text-sm text-[#a78bfa]">Use as example</span>
                  </div>
                </div>

                <p className="mt-6 sm:mt-8 border-l-2 border-[#14b8a6]/50 pl-4 text-sm sm:text-base text-[#969696]">
                  No more copy-pasting paths or guessing what the model
                  &ldquo;saw&rdquo;. Your intent is explicit. Your results are
                  better.
                </p>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-[#14b8a6]/50" />
                <div className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-[#14b8a6]/50" />
                <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[#14b8a6]/50" />
                <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-[#14b8a6]/50" />

                <div className="rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center justify-between rounded-lg border border-dashed border-white/10 bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <FileText className="h-4 w-4 text-[#14b8a6]" />
                        <span className="text-xs sm:text-sm text-[#a6a6a6] truncate">src/components/Button.tsx</span>
                      </div>
                      <span className="rounded border border-dashed border-[#14b8a6]/40 bg-[#14b8a6]/10 px-2 py-1 text-xs text-[#14b8a6] whitespace-nowrap">
                        MODIFY
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-dashed border-white/10 bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <FileText className="h-4 w-4 text-[#f6543e]" />
                        <span className="text-xs sm:text-sm text-[#a6a6a6] truncate">src/config/constants.ts</span>
                      </div>
                      <span className="rounded border border-dashed border-[#f6543e]/40 bg-[#f6543e]/10 px-2 py-1 text-xs text-[#f6543e] whitespace-nowrap">
                        LOCKED
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-dashed border-white/10 bg-white/5 px-3 py-2 sm:px-4 sm:py-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <FileText className="h-4 w-4 text-[#a78bfa]" />
                        <span className="text-xs sm:text-sm text-[#a6a6a6] truncate">src/utils/helpers.ts</span>
                      </div>
                      <span className="rounded border border-dashed border-[#a78bfa]/40 bg-[#a78bfa]/10 px-2 py-1 text-xs text-[#a78bfa] whitespace-nowrap">
                        EXAMPLE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prompting Section */}
        <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-8 lg:gap-16 lg:grid-cols-2">
              {/* Visual - on left this time */}
              <div className="relative order-2 lg:order-1">
                <div className="absolute -left-2 -top-2 h-4 w-4 border-l border-t border-[#14b8a6]/50" />
                <div className="absolute -right-2 -top-2 h-4 w-4 border-r border-t border-[#14b8a6]/50" />
                <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b border-l border-[#14b8a6]/50" />
                <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b border-r border-[#14b8a6]/50" />

                <div className="rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
                  <div className="mb-3 text-xs font-medium uppercase tracking-wider text-[#969696]">
                    Prompt Editor
                  </div>
                  <div className="rounded-lg border border-dashed border-white/20 bg-[#09090b] p-3 sm:p-4">
                    <div className="font-mono text-xs sm:text-sm text-[#a6a6a6]">
                      <p>Refactor the Button component to:</p>
                      <p className="mt-2">1. Use the new design tokens</p>
                      <p className="mt-2">2. Add loading state support</p>
                      <p className="mt-2">3. Follow the pattern in helpers.ts</p>
                      <p className="mt-2">Keep the existing API compatible.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded border border-dashed border-white/20 bg-white/5 px-2 py-1 text-xs text-[#969696]">
                        refactor-template
                      </span>
                      <span className="rounded border border-dashed border-white/20 bg-white/5 px-2 py-1 text-xs text-[#969696]">
                        react-component
                      </span>
                    </div>
                    <button className="rounded-lg bg-[#14b8a6] px-4 py-2 text-sm font-medium text-[#09090b] w-full sm:w-fit">
                      Send
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#14b8a6]">
                  Prompt Editor
                </p>
                <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
                  Prompting That
                  <span className="block text-[#969696]">Doesn&apos;t Fight You</span>
                </h2>
                <p className="mb-6 sm:mb-8 text-base sm:text-lg text-[#969696]">
                  Stop typing prompts one line at a time in a terminal.
                </p>

                <ul className="space-y-3 sm:space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#14b8a6]/40 bg-[#14b8a6]/10">
                      <Terminal className="h-3 w-3 text-[#14b8a6]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#a6a6a6]">
                      Multi-line textarea for complex instructions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#14b8a6]/40 bg-[#14b8a6]/10">
                      <ArrowRight className="h-3 w-3 text-[#14b8a6]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#a6a6a6]">
                      Send prompts straight into your terminal agent
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-[#14b8a6]/40 bg-[#14b8a6]/10">
                      <FileText className="h-3 w-3 text-[#14b8a6]" />
                    </div>
                    <span className="text-sm sm:text-base text-[#a6a6a6]">
                      Save and reuse prompt templates across sessions
                    </span>
                  </li>
                </ul>

                <p className="mt-6 sm:mt-8 text-base sm:text-lg font-medium text-white">
                  Write once. Reuse forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sync Section */}
        <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#14b8a6]">
                Bidirectional Sync
              </p>
              <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
                Terminal and File Tree,
                <span className="block text-[#969696]">Perfectly in Sync</span>
              </h2>
              <p className="mx-auto mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg text-[#969696]">
                Lirah keeps your UI and terminal aligned at all times.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
                <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#14b8a6]/50" />
                <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#14b8a6]/50" />

                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                    <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-[#14b8a6]" />
                  </div>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#969696]" />
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                    <FolderTree className="h-4 w-4 sm:h-5 sm:w-5 text-[#14b8a6]" />
                  </div>
                </div>
                <p className="font-mono text-xs sm:text-sm text-[#a6a6a6]">
                  <span className="text-[#14b8a6]">cd</span> in the terminal →
                  sidebar updates instantly
                </p>
              </div>

              <div className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6">
                <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#14b8a6]/50" />
                <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#14b8a6]/50" />

                <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                    <FolderTree className="h-4 w-4 sm:h-5 sm:w-5 text-[#14b8a6]" />
                  </div>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#969696]" />
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                    <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-[#14b8a6]" />
                  </div>
                </div>
                <p className="font-mono text-xs sm:text-sm text-[#a6a6a6]">
                  Click a folder in the sidebar → terminal navigates there
                </p>
              </div>
            </div>

            <p className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-[#969696]">
              Always know where you are, without thinking about it.{" "}
              <span className="text-white">It feels obvious—because it should.</span>
            </p>
          </div>
        </section>

        {/* Workflows Section */}
        <section id="workflows" className="border-t border-dashed border-white/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#14b8a6]">
                Workflows
              </p>
              <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
                Built-In Agent Workflows
              </h2>
              <p className="mx-auto mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg text-[#969696]">
                Lirah ships with workflow templates out of the
                box. Start strong instead of from scratch.
              </p>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[
                { icon: GitBranch, label: "Feature", desc: "New feature development" },
                { icon: Bug, label: "Bugfix", desc: "Debug and fix issues" },
                { icon: RefreshCw, label: "Refactor", desc: "Code restructuring" },
                { icon: Gauge, label: "Performance", desc: "Speed optimizations" },
                { icon: FileSearch, label: "Review", desc: "Code review assistance" },
                { icon: GitPullRequest, label: "Pull Request", desc: "PR preparation" },
                { icon: FileCode, label: "Documentation", desc: "Docs generation" },
                { icon: Puzzle, label: "React", desc: "React-specific variants" },
                { icon: Settings, label: "Orchestration", desc: "Enforce custom instructions on every agent prompt" },
              ].map((workflow) => (
                <div
                  key={workflow.label}
                  className="group relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-3 sm:p-4 transition-colors hover:border-[#14b8a6]/40 hover:bg-[#14b8a6]/5"
                >
                  <div className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-[#14b8a6]/50" />
                  <div className="absolute -right-1 -top-1 h-2 w-2 border-r border-t border-[#14b8a6]/50" />
                  <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-[#14b8a6]/50" />
                  <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-[#14b8a6]/50" />

                  <div className="mb-2 sm:mb-3 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                    <workflow.icon className="h-3 w-3 sm:h-4 sm:w-4 text-[#14b8a6]" />
                  </div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">{workflow.label}</h3>
                  <p className="text-xs sm:text-sm text-[#969696] mt-1">{workflow.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Lirah Section */}
        <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="mb-8 sm:mb-12 text-2xl sm:text-3xl font-bold tracking-tight">
                Why Lirah?
              </h2>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6 text-center">
                <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#14b8a6]/50" />
                <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#14b8a6]/50" />

                <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                  <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-[#14b8a6]" />
                </div>
                <h3 className="mb-2 font-semibold text-white text-sm sm:text-base">Native & Fast</h3>
                <p className="text-xs sm:text-sm text-[#969696]">
                  Lightweight Tauri app, not an Electron behemoth
                </p>
              </div>

              <div className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6 text-center">
                <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#14b8a6]/50" />
                <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#14b8a6]/50" />

                <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                  <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-[#14b8a6]" />
                </div>
                <h3 className="mb-2 font-semibold text-white text-sm sm:text-base">Better Output</h3>
                <p className="text-xs sm:text-sm text-[#969696]">
                  Structured context = better agent results
                </p>
              </div>

              <div className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6 text-center">
                <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#14b8a6]/50" />
                <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#14b8a6]/50" />

                <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                  <Puzzle className="h-5 w-5 sm:h-6 sm:w-6 text-[#14b8a6]" />
                </div>
                <h3 className="mb-2 font-semibold text-white text-sm sm:text-base">Real Workflows</h3>
                <p className="text-xs sm:text-sm text-[#969696]">
                  Designed for actual development, not demos
                </p>
              </div>

              <div className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6 text-center">
                <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#14b8a6]/50" />
                <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#14b8a6]/50" />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#14b8a6]/50" />

                <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                  <Monitor className="h-5 w-5 sm:h-6 sm:w-6 text-[#14b8a6]" />
                </div>
                <h3 className="mb-2 font-semibold text-white text-sm sm:text-base">Terminal-First</h3>
                <p className="text-xs sm:text-sm text-[#969696]">
                  Terminal-first, not terminal-hostile
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
              If you use CLI coding agents seriously,
              <span className="block text-[#14b8a6]">
                Lirah becomes the place you run them.
              </span>
            </h2>
            <div className="mt-6 sm:mt-10">
              <a
                href="https://github.com/emdmed/lirah"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#14b8a6] px-6 sm:px-8 text-base font-medium text-[#09090b] transition-colors hover:bg-[#5eead4] w-full sm:w-fit"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="border-t border-dashed border-white/20 py-8 sm:py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
            <p className="mb-4 sm:mb-6 text-sm text-[#969696]">
              Built with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[#a6a6a6]">
              <span className="rounded border border-dashed border-white/20 bg-white/5 px-3 py-1.5 text-sm">
                Tauri 2
              </span>
              <span className="rounded border border-dashed border-white/20 bg-white/5 px-3 py-1.5 text-sm">
                React 19
              </span>
              <span className="rounded border border-dashed border-white/20 bg-white/5 px-3 py-1.5 text-sm">
                xterm.js
              </span>
              <span className="rounded border border-dashed border-white/20 bg-white/5 px-3 py-1.5 text-sm">
                TypeScript
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-dashed border-white/20 py-6 sm:py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <span className="text-sm text-[#969696]">
                © 2025 Lirah. Open source.
              </span>
              <div className="flex items-center gap-6">
                <a
                  href="https://github.com/emdmed/lirah"
                  className="text-sm text-[#969696] transition-colors hover:text-white"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
