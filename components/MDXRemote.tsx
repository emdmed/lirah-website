import { MDXRemote as NextMDXRemote } from "next-mdx-remote/rsc";
import { slug } from "@/lib/blog";
import { Answers, Clip, Commit, Figure, Listing } from "@/components/blog/Figure";

// Plain text of rendered children, so a heading's id matches the slug the outline builds from the source.
const text = (n: React.ReactNode): string =>
  typeof n === "string" || typeof n === "number" ? String(n) : Array.isArray(n) ? n.map(text).join("") : n && typeof n === "object" && "props" in n ? text((n.props as { children?: React.ReactNode }).children) : "";

const components = {
  h2: ({ children }: { children?: React.ReactNode }) => <h2 id={slug(text(children))}>{children}</h2>,
  Answers,
  Clip,
  Commit,
  Figure,
  Listing,
};

export function MDXRemote({ source }: { source: string }) {
  return <NextMDXRemote source={source} components={components} />;
}
