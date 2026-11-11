"use client";
import { useEffect, useRef } from "react";
import { figures } from "./figures";

/* eslint-disable @typescript-eslint/no-explicit-any */
let kit: Promise<any> | null = null;
const loadKit = () =>
  (kit ??= new Promise((resolve, reject) => {
    const w = window as any;
    if (w.Calibrated) return resolve(w.Calibrated);
    const s = document.createElement("script");
    s.src = "/calibrated-figures.js";
    s.onload = () => resolve(w.Calibrated);
    s.onerror = reject;
    document.head.append(s);
  }));

/** A Calibrated figure from components/blog/figures.ts, with its caption as children. */
export function Figure({ name, children }: { name: string; children?: React.ReactNode }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    loadKit().then((C) =>
      C.ready(() => {
        const svg = ref.current;
        if (!svg) return; // unmounted before fonts settled
        const f = figures[name](C);
        svg.setAttribute("width", String(f.w));
        svg.setAttribute("height", String(f.h));
        svg.setAttribute("viewBox", `0 0 ${f.w} ${f.h}`);
        svg.style.maxWidth = Math.round(f.w * 1.3) + "px";
        C.draw(svg, f.markup, f.label);
      }),
    );
  }, [name]);
  return (
    <figure className="cal-fig">
      <div className="cal-scroll"><svg ref={ref} /></div>
      {children && <figcaption>{children}</figcaption>}
    </figure>
  );
}

/** The answer strip: the reader's questions, one line each, before the sections. */
export const Answers = ({ children }: { children: React.ReactNode }) => <dl className="answers" aria-label="In short">{children}</dl>;

/** One commit set as a record inside a Listing: hash, subject, then its trailers as key and value.
    Children are a markdown list, one item per `Decision:` line. */
export const Commit = ({ sha, scope, subject, chunk, children }: { sha: string; scope: string; subject: string; chunk: string; children?: React.ReactNode }) => (
  <div className="commit">
    <span className="sha">{sha}</span>
    <div className="subject"><span>{scope}</span>{subject}</div>
    {children}
    <div className="trailer"><span>Plan-Chunk:</span>{chunk}</div>
  </div>
);

/** A code listing labelled like a figure: "LISTING n · label" over the block. */
export const Listing = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <figure className="listing">
    <figcaption>{label}</figcaption>
    {children}
  </figure>
);
