"use client";
import { useEffect, useState } from "react";

type Item = { id: string; title: string };

/** The post's outline: a list in the rail on desktop, a closed disclosure on phones. Marks the section in view. */
export function Outline({ items }: { items: Item[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const heads = items.map((h) => document.getElementById(h.id)).filter((h): h is HTMLElement => !!h);
    // the current section is the last heading that has scrolled past the top third of the viewport
    const pick = () => {
      let id: string | null = null;
      for (const h of heads) if (h.getBoundingClientRect().top < innerHeight / 3) id = h.id;
      setCurrent(id);
    };
    pick();
    addEventListener("scroll", pick, { passive: true });
    return () => removeEventListener("scroll", pick);
  }, [items]);

  const list = (
    <ol>
      {items.map((h) => (
        <li key={h.id}>
          <a href={`#${h.id}`} aria-current={current === h.id ? "location" : undefined}>{h.title}</a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <nav className="toc-rail" aria-label="In this post">{list}</nav>
      <details className="toc-fold">
        <summary>In this post <span>· {items.length}</span></summary>
        <nav aria-label="In this post">{list}</nav>
      </details>
    </>
  );
}
