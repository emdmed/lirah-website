import { ArrowRight, Github } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-24 pt-24 sm:pt-32">
      {/* Subtle glow accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[300px] w-[500px] sm:h-[400px] sm:w-[600px] -translate-x-1/2 rounded-full bg-[#7a9e98]/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Mobile-first layout: Description + CTA first, then Title */}
        <div className="text-center lg:text-left lg:grid lg:items-center lg:gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Description + CTA */}
          <div>
            <p className="mb-4 text-xl sm:text-2xl font-bold text-white">
              Ship More Code. Burn Fewer Tokens.
            </p>
            <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed text-[#a6a6a6] max-w-xl mx-auto lg:mx-0">
              Most of what your AI agent reads, it never uses. Lirah gives it exactly what it needs—so you get more iterations, fewer hallucinations, and stop hitting rate limits by noon.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <a
                href="#download"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#7a9e98] px-6 text-base font-medium text-[#09090b] transition-colors hover:bg-[#a0b8b3]"
              >
                Get Lirah Free
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#problem"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 px-6 text-base font-medium text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                See How It Works
              </a>
            </div>
          </div>

          {/* Title */}
          <div className="flex justify-center lg:justify-start items-center">
            <h1 className="font-[family-name:var(--font-grenze-gotisch)] text-6xl sm:text-8xl lg:text-[9rem] xl:text-[12rem] 2xl:text-[15rem] leading-none text-white">
              Lirah
            </h1>
          </div>
        </div>

        {/* Product Screenshot */}
        <div className="mt-8 sm:mt-16">
          <div className="relative">
            <div className="absolute -left-2 -top-2 sm:-left-3 sm:-top-3 h-4 w-4 sm:h-6 sm:w-6 border-l-2 border-t-2 border-dashed border-white/30" />
            <div className="absolute -right-2 -top-2 sm:-right-3 sm:-top-3 h-4 w-4 sm:h-6 sm:w-6 border-r-2 border-t-2 border-dashed border-white/30" />

            <div className="relative rounded-xl bg-[#09090b]">
              <video
                src="/screenrecording-2026-02-07_16-11-20.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
