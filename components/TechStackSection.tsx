const techStack = ["Tauri 2", "React 19", "xterm.js", "TypeScript"];

export function TechStackSection() {
  return (
    <section className="border-t border-dashed border-white/20 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <p className="mb-4 sm:mb-6 text-sm text-[#969696]">
          Built with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[#a6a6a6]">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-dashed border-white/20 bg-white/5 px-3 py-1.5 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
