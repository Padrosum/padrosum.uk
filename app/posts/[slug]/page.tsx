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
      <article className="fade-up mt-14">
        <header className="mb-10">
          <h1 className="font-bold leading-[1.15] tracking-tight text-4xl text-text text-balance sm:text-[2.75rem]">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 font-mono text-[0.72rem] text-faint">
            <time>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} dk okuma</span>
            {post.type && (
              <>
                <span aria-hidden>·</span>
                <span>{post.type}</span>
              </>
            )}
          </div>
        </header>

        <div
          className={`prose ${isPoem ? "prose-poem" : ""}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      <nav className="mt-16">
        <Link
          href="/"
          className="text-accent underline decoration-faint underline-offset-4 hover:decoration-accent"
        >
          ← Tüm yazılar
        </Link>
      </nav>
    </>
  );
}
