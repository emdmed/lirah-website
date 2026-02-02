import { DollarSign, Clock, Brain, Rocket } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "Reduce Token Waste",
    description: "Smart token discipline stretches your plan further",
  },
  {
    icon: Clock,
    title: "More Iterations",
    description: "Clean context means more coding before hitting limits",
  },
  {
    icon: Brain,
    title: "Fewer Errors",
    description: "Explicit intent = accurate results, less debugging",
  },
  {
    icon: Rocket,
    title: "Reclaim Your Flow",
    description: "No more context curation—just pure coding flow",
  },
];

export function ROISection() {
  return (
    <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#14b8a6]">
            Your Bottom Line
          </p>
          <h2 className="mb-8 sm:mb-12 text-2xl sm:text-3xl font-bold tracking-tight">
            Less Waste. More Flow.
          </h2>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-4 sm:p-6 text-center"
            >
              <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#14b8a6]/50" />
              <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#14b8a6]/50" />
              <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-[#14b8a6]/50" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-[#14b8a6]/50" />

              <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg border border-dashed border-[#14b8a6]/30 bg-[#14b8a6]/10">
                <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#14b8a6]" />
              </div>
              <h3 className="mb-2 font-semibold text-white text-sm sm:text-base">{benefit.title}</h3>
              <p className="text-xs sm:text-sm text-[#969696]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
