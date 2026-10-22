import { notFound } from "next/navigation";
import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "@/components/MDXRemote";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.meta.title} - Lirah Blog`, description: post.meta.description };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <StatusBar />

      <main className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
        <Link
          href="/blog"
          className="ins-key ins-key-panel mb-8"
        >
          [← blog]
        </Link>

        <time className="ins-legend block">{post.meta.date}</time>
        <h1 className="mt-3 mb-10 text-[clamp(28px,3.4vw,42px)] leading-[1.12]">{post.meta.title}</h1>

        <article className="prose prose-invert max-w-none text-[15px] prose-headings:font-normal prose-headings:text-strong prose-p:text-foreground prose-a:text-strong prose-a:decoration-dotted prose-a:underline-offset-4 prose-strong:text-strong prose-strong:font-normal prose-li:text-foreground prose-code:text-strong prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-none prose-pre:bg-[var(--ins-glass)] prose-hr:border-edge prose-blockquote:border-edge prose-blockquote:text-muted-foreground prose-h1:hidden">
          <MDXRemote source={post.content} />
        </article>
      </main>

      <Footer />
    </>
  );
}
