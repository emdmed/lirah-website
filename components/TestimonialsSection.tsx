import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Been using it extensively for the past week. The smart file selection is a <span class=\"text-white\">game changer</span>—massive difference in how focused my agent outputs are.",
    author: "Frontend Engineer, testing similar setups",
  },
  {
    quote: "Finally, an agent wrapper that <span class=\"text-white\">doesn't slow my flow</span>. The token discipline this enforces has cut my daily costs noticeably.",
    author: "AI Engineer, building agentic workflows",
  },
  {
    quote: "If you're a developer using Claude Code seriously, this is <span class=\"text-white\">worth checking out</span>. It earns its keep on day one.",
    author: "Founder, using CLI agents daily",
  },
];

export function TestimonialsSection() {
  return (
    <section className="border-t border-dashed border-white/20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-[#14b8a6]">
            What Developers Say
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Built for LLM Power Users
          </h2>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-xl border border-dashed border-white/20 bg-[#0f0f11] p-6"
            >
              <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-[#14b8a6]/50" />
              <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-[#14b8a6]/50" />
              <Quote className="h-6 w-6 text-[#14b8a6]/40 mb-4" />
              <p
                className="text-sm sm:text-base text-[#a6a6a6] mb-4"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${testimonial.quote}&rdquo;` }}
              />
              <p className="text-xs text-[#969696]">— {testimonial.author}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[#969696]">
          Built by software engineers, for software engineers. Highly recommend for anyone doing agentic AI work.
        </p>
      </div>
    </section>
  );
}
