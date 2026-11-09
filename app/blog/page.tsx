import Link from "next/link";
import { OrrerySky } from "@/components/Orrery";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog - Lirah",
  description: "Technical posts about building Lirah, context management, and CLI agent workflows.",
};

// The atlas crosshair the orrery bodies wear, here marking each entry.
function Star() {
  return (
    <svg className="star" viewBox="-10 -10 20 20" aria-hidden="true">
      <path d="M-9 0H9M0 -9V9" />
      <circle r="4.6" />
      <circle r="1.8" className="core" />
    </svg>
  );
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="bplate" aria-labelledby="blog-h">
        <OrrerySky className="sky" />
        <div className="bhead">
          <h1 id="blog-h">Blog</h1>
          <p className="lede">Technical posts about developing Lirah.</p>
        </div>
      </section>
      <p className="cap bcap">
        <span><b>Blog</b> · {posts.length} {posts.length === 1 ? "post" : "posts"}</span>
      </p>

      <ol className="entries ruled">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="entry">
              <time dateTime={post.date}>{post.date}</time>
              <div>
                <h2><Star />{post.title}</h2>
                {post.description && <p>{post.description}</p>}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
