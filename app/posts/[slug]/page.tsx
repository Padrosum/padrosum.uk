import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, renderMarkdown, formatDate, excerpt } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — Alihan Padros Karakuş`,
    description: excerpt(post),
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();

  const html = await renderMarkdown(post.content);
  const isPoem = post.type === "şiir";

  return (
    <>
      <nav className="pt-12">
        <Link
          href="/"
          className="font-mono text-[0.68rem] tracking-[0.15em] uppercase text-gold-dim transition-colors hover:text-gold"
        >
          ← Mukkadim
        </Link>
      </nav>

      <article className="fade-up mt-10">
        <header className="relative mb-10 border-b border-border pb-8 after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-20 after:bg-gold">
          <div className="mb-4 flex flex-wrap items-baseline gap-x-4 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-gold-dim">
            <span>{formatDate(post.date)}</span>
            <span className="text-muted">{post.readingMinutes} dk okuma</span>
            {post.type && <span className="text-accent">{post.type}</span>}
          </div>
          <h1 className="font-display text-[clamp(1.4rem,3.5vw,2rem)] leading-[1.2] font-semibold text-cream">
            {post.title}
          </h1>
        </header>

        <div
          className={`prose ${isPoem ? "prose-poem" : ""}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      <nav className="mt-16">
        <Link
          href="/"
          className="font-mono text-[0.68rem] tracking-[0.15em] uppercase text-gold-dim transition-colors hover:text-gold"
        >
          ← Tüm yazılar
        </Link>
      </nav>
    </>
  );
}
