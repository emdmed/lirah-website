import Link from "next/link";
import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog - Lirah",
  description: "Technical posts about building Lirah, context management, and CLI agent workflows.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <StatusBar />

      <main className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
        <h1 className="mb-2 text-[clamp(30px,3.6vw,44px)] leading-tight">Blog</h1>
        <p className="mb-12 text-muted-foreground">
          Technical posts about developing Lirah.
        </p>

        <div className="space-y-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="pane block px-5 pb-5 pt-4"
            >
              <time className="ins-legend">{post.date}</time>
              <h2 className="mt-2 text-[19px] leading-snug">{post.title}</h2>
              {post.description && (
                <p className="mt-2 text-[14px] text-muted-foreground">{post.description}</p>
              )}
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
