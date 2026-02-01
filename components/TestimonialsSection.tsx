import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I built Lirah with Lirah and a 20 bucks LLM plan. <span class=\"text-white\">Using it everyday now</span>.",
    author: "Lirah's Dev",
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

        <div className="max-w-2xl mx-auto">
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
