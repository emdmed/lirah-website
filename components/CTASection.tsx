import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight">
          Stop Wasting Tokens.
          <span className="block text-[#14b8a6]">
            Start Shipping.
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#969696] mb-8">
          A daily workflow game changer for software engineers, AI engineers, and founders building with CLI agents. Free and open source.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#download"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#14b8a6] px-6 sm:px-8 text-base font-medium text-[#09090b] transition-colors hover:bg-[#5eead4] w-full sm:w-fit"
          >
            Download Free
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/emdmed/lirah"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-white/5 px-6 sm:px-8 text-base font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10 w-full sm:w-fit"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
