import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
          Stop Wasting Money.
          <span className="block text-[#7a9e98]">
            Start Building Smarter.
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#969696] mb-8">
          Join engineers who care about token discipline. Free, open source, and terminal-first.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#download"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#7a9e98] px-8 text-base font-medium text-[#09090b] transition-colors hover:bg-[#a0b8b3] w-full sm:w-fit"
          >
            Download Free
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-sm text-[#969696]">
            or <a href="https://github.com/emdmed/lirah" className="text-[#7a9e98] hover:text-[#a0b8b3] transition-colors">view on GitHub</a>
          </p>
        </div>
      </div>
    </section>
  );
}
