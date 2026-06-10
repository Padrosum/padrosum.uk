import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "posts");

export interface Post {
  slug: string;
  file: string;
  title: string;
  date: string; // ISO
  description?: string;
  type?: string; // "şiir" gibi; şiirler özel biçimlendirilir
  content: string;
  readingMinutes: number;
}

const TR_MAP: Record<string, string> = {
  ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", I: "i", İ: "i",
  ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u", â: "a", î: "i", û: "u",
};

export function slugify(name: string): string {
  return name
    .replace(/[çÇğĞıIİöÖşŞüÜâîû]/g, (ch) => TR_MAP[ch] ?? ch)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleFromContent(content: string, file: string): { title: string; body: string } {
  // Gövdenin en başında "# başlık" varsa başlık olarak alınıp gövdeden çıkarılır;
  // yoksa dosya adı başlık olur
  const match = content.match(/^\s*#\s+(.+?)\s*\n/);
  if (match) {
    return { title: match[1], body: content.slice(match[0].length).trimStart() };
  }
  return { title: path.basename(file, ".md"), body: content };
}

function normalizeDate(value: unknown, filePath: string): string {
  if (value instanceof Date && !isNaN(value.getTime())) return value.toISOString();
  if (typeof value === "string") {
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  return fs.statSync(filePath).mtime.toISOString();
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const fullPath = path.join(POSTS_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      // Başlık çift görünmesin diye gövdenin en başındaki h1 her durumda atılır
      const { title: h1Title, body } = titleFromContent(content, file);
      const title = data.title ? String(data.title) : h1Title;
      const words = body.split(/\s+/).filter(Boolean).length;
      return {
        slug: slugify(path.basename(file, ".md")),
        file,
        title,
        date: normalizeDate(data.date, fullPath),
        description: data.description ? String(data.description) : undefined,
        type: data.type ? String(data.type) : undefined,
        content: body,
        readingMinutes: Math.max(1, Math.round(words / 200)),
      };
    });
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function excerpt(post: Post): string {
  if (post.description) return post.description;
  const text = post.content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#+\s.*$/gm, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[*_>`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 180 ? text.slice(0, 180).replace(/\s+\S*$/, "") + "…" : text;
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "vesper",
      keepBackground: false,
      defaultLang: "text",
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);
  return String(result);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
