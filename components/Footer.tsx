import Link from "next/link";
import { REPO_URL, RELEASES_URL } from "@/lib/releases";

export function Footer() {
  return (
    <footer className="mt-28 border-t border-edge sm:mt-36">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-6 text-[13px] text-muted-foreground">
        <span>© 2026 Lirah contributors · MIT</span>
        <nav aria-label="Footer" className="flex gap-1">
          <a href={REPO_URL} className="ins-key ins-key-panel">[github]</a>
          <a href={RELEASES_URL} className="ins-key ins-key-panel">[releases]</a>
          <Link href="/blog" className="ins-key ins-key-panel">[blog]</Link>
        </nav>
      </div>
    </footer>
  );
}
