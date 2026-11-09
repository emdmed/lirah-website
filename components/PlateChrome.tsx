// The Measured Plate bar, footer and lyre symbol, shared by the landing page and the blog.
// `home` keeps the section links in-page; elsewhere they point back to the landing page.
import { REPO_URL } from "@/lib/releases";

export function LyreSymbol() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      {/* The bare lyre with one body in its ring; mirrors components/instrument/LirahMark.tsx. */}
      <symbol id="lyre" viewBox="6 6 88 88">
        <path transform="translate(50 52) scale(.86) translate(-50 -49.5)" d="M22 8C24 34 12 48 14 64C16 84 32 94 50 94C68 94 84 84 86 64C88 48 76 34 78 8C77 34 70 48 70 60C70 74 62 80 50 80C38 80 30 74 30 60C30 48 23 34 22 8Z" stroke="none" />
        <circle cx="50" cy="27" r="9.5" fill="none" strokeWidth="2.2" />
        <circle cx="50" cy="27" r="4.8" stroke="none" />
      </symbol>
    </svg>
  );
}

export function Lyre() {
  return (
    <svg aria-hidden="true">
      <use href="#lyre" />
    </svg>
  );
}

export function PlateBar({ home = false }: { home?: boolean }) {
  const p = home ? "" : "/";
  return (
    <header className="bar">
      <a className="wm" href={home ? "#top" : "/"} aria-label="Lirah home">
        <Lyre />
        <b>Lirah</b>
        <small>A workspace for CLI coding agents</small>
      </a>
      <nav aria-label="Main">
        <a href={`${p}#context`}>Context</a>
        <a href={`${p}#workspace`}>Workspace</a>
        <a href={`${p}#jobs`}>Plans</a>
        <a href={`${p}#evals`}>Evals</a>
        <a href="/blog">Blog</a>
        <a href={REPO_URL}>GitHub</a>
        <a className="btn line sm" href={`${p}#install`}>Download</a>
      </nav>
    </header>
  );
}

export function PlateFooter({ home = false }: { home?: boolean }) {
  return (
    <footer className="ruled">
      <a className="wm" href={home ? "#top" : "/"} aria-label={home ? "Back to top" : "Lirah home"}>
        <Lyre />
        <b>Lirah</b>
      </a>
      <span>© 2026 Lirah contributors · MIT · Made by <a href="https://mylatestwork.dev/">Enrique MD</a></span>
      <nav aria-label="Footer">
        <a href={REPO_URL}>GitHub</a>
        <a href="/blog">Blog</a>
        <a href={home ? "#evals" : "/#evals"}>Evals</a>
      </nav>
    </footer>
  );
}
