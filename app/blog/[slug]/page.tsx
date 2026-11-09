import { notFound } from "next/navigation";
import Link from "next/link";
import { OrrerySky } from "@/components/Orrery";
import { getAllPosts, getOutline, getPostBySlug, readingMinutes } from "@/lib/blog";
import { MDXRemote } from "@/components/MDXRemote";
import { Outline } from "@/components/blog/Outline";

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

  const outline = getOutline(post.content);
  // "Title: subtitle" sets the subtitle as a deck under the headline
  const [head, ...rest] = post.meta.title.split(": ");
  const deck = rest.join(": ");

  return (
    <main id="content" tabIndex={-1}>
      <section className="bplate post-plate" aria-labelledby="post-h">
        <OrrerySky className="sky" />
        <div className="bhead">
          <Link href="/blog" className="back">← Blog</Link>
          <h1 id="post-h">
            {head}
            {deck && <><span className="sr-only">: </span><span className="deck">{deck}</span></>}
          </h1>
        </div>
      </section>

      <div className="ruled post-grid">
        <aside className="rail">
          <dl>
            <div><dt>Posted</dt><dd><time dateTime={post.meta.date}>{post.meta.date}</time></dd></div>
            <div><dt>Reading</dt><dd>{readingMinutes(post.content)} min</dd></div>
          </dl>
          {outline.length > 1 && <Outline items={outline} />}
        </aside>
        <article className="post">
          <MDXRemote source={post.content} />
        </article>
      </div>
    </main>
  );
}
