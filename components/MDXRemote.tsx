import { MDXRemote as NextMDXRemote } from "next-mdx-remote/rsc";

export function MDXRemote({ source }: { source: string }) {
  return <NextMDXRemote source={source} />;
}
