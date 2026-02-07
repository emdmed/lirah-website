import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "app/blog/_posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(postsDirectory, filename), "utf-8");
    const meta = parseFrontmatter(raw);

    return {
      slug,
      title: meta.title || slug,
      date: meta.date || "",
      description: meta.description || "",
    };
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const meta = parseFrontmatter(raw);
  const content = raw.replace(/^---[\s\S]*?---\n*/, "");
  return { meta: { slug, title: meta.title || slug, date: meta.date || "", description: meta.description || "" }, content };
}

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const result: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx !== -1) {
      result[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return result;
}
