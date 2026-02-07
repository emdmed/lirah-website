import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog - Lirah",
  description: "Technical posts about building Lirah, context management, and CLI agent workflows.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased">
      <Navigation />

      <main className="relative z-10 mx-auto max-w-3xl px-4 pt-32 pb-20 sm:px-6">
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">Blog</h1>
        <p className="mb-12 text-[#a6a6a6]">
          Technical posts about developing Lirah.
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-dashed border-white/20 p-6 transition-colors hover:border-[#7a9e98]/60 hover:bg-white/[0.02]"
            >
              <time className="text-xs text-[#a6a6a6]">{post.date}</time>
              <h2 className="mt-1 text-lg font-semibold">{post.title}</h2>
              {post.description && (
                <p className="mt-2 text-sm text-[#a6a6a6]">{post.description}</p>
              )}
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
