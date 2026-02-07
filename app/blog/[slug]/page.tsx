import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
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
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      <Navigation />

      <main className="relative z-10 mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm text-[#a6a6a6] transition-colors hover:text-white"
        >
          &larr; Back to blog
        </Link>

        <time className="block text-xs text-[#a6a6a6]">{post.meta.date}</time>
        <h1 className="mt-2 mb-8 text-3xl font-bold sm:text-4xl">{post.meta.title}</h1>

        <article className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-[#c4c4c4] prose-a:text-[#7a9e98] prose-strong:text-white prose-li:text-[#c4c4c4] prose-h1:hidden">
          <MDXRemote source={post.content} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
