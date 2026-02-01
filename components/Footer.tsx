import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-dashed border-white/20 py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo size={20} />
            <span className="text-sm text-[#969696]">
              © 2026 Lirah. Open source.
            </span>
          </div>
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
  );
}
