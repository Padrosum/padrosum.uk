import Link from "next/link";
import { getAllPosts, excerpt, formatDate } from "@/lib/posts";

const profile: [string, string][] = [
  ["İsim", "Alihan Padros Karakuş"],
  ["Öğrenim Durumu", "Üniversite Öğrencisi"],
  ["OS", "Arch Linux"],
  ["Felsefi Duruş", "Aristotelesçi Panteizm"],
];

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      {/* ── Hero ── */}
      <header className="pt-16 pb-12 border-b">
        <h1 className="font-bold leading-[1.05] tracking-tight text-4xl text-text sm:text-5xl">
          Alihan Padros Karakuş
        </h1>
        <p className="mt-3 font-mono text-[0.75rem] tracking-[0.18em] uppercase text-muted">
          Felsefe · İlahiyat · CS · Mitoloji
        </p>
      </header>

      {/* ── Bio ── */}
      <div className="prose mt-10">
        <p>
          Ben Alihan Padros Karakuş, 21 yaşında felsefe, ilahiyat, CS ve mitoloji ile ilgilenen
          bir Türk genciyim. Çoğunlukla Twitter&apos;da siyaset, felsefe ve ilahiyat alanındaki
          tartışmalarım ile bilinirim/bilinirdim. 2024 yılının başlarında tartışma kültüründen
          vazgeçip biraz arınma sürecine girdim, aslında depresyon desek daha iyi olur.
        </p>
        <p>
          Neyse bu iki yıllık süreçte ana ilgim felsefe ve dinden biraz daha teknolojiye, internet
          protokolleri ve Özgür Yazılım fikriyatına doğru kaymış olabilirim.{" "}
          <a href="http://www.mustakildergi.com" target="_blank" rel="noopener">
            Mustakil Dergi
          </a>{" "}
          adlı bir sitede bir çok felsefe ve din konulu yazılarımı bulabilirsiniz. Ama bakın bu
          site özgür yazılım değil, Google&apos;ın Blogger servisini ve Cloudflare servisini
          kullanan bir siteden ibaret. Neyse burayı bir blog sayfası olarak kullanmak istiyorum.
        </p>
        <p>
          Felsefede Peripatetik bir panteist, dini alanda tarihselci bir müslüman, siyasette ise
          Cenabı Allah dünyayı yaratmış, Atatürk vatanı kurtarmış çizgisinde biriyim.
        </p>
        <p>
          İletişim:{" "}
          <a href="mailto:padrosum@disroot.org" className="font-mono text-[0.95rem]">
            padrosum@disroot.org
          </a>{" "}
          — bu adres üzerinden XMPP protokolünde de bir hesabım mevcuttur.
        </p>
      </div>

      {/* ── Profil kartı ── */}
      <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-xl border bg-surface px-6 py-5 font-mono text-[0.85rem]">
        {profile.map(([key, val]) => (
          <div key={key} className="contents">
            <dt className="text-muted">{key}</dt>
            <dd className="text-text">{val}</dd>
          </div>
        ))}
      </dl>

      {/* ── Blog ── */}
      <h2 className="mt-20 mb-6 font-mono text-[0.75rem] tracking-[0.2em] text-muted uppercase">
        Yazılar
      </h2>

      {posts[0] && (
        <Link
          href={`/posts/${posts[0].slug}/`}
          className="fade-up group block rounded-2xl border bg-surface p-6 transition-colors hover:border-accent sm:p-8"
        >
          <div className="mb-3 flex flex-wrap items-center gap-x-3 font-mono text-[0.72rem] text-faint">
            <span>{formatDate(posts[0].date)}</span>
            <span aria-hidden>·</span>
            <span>{posts[0].readingMinutes} dk okuma</span>
            {posts[0].type && (
              <>
                <span aria-hidden>·</span>
                <span>{posts[0].type}</span>
              </>
            )}
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-text transition-colors group-hover:text-accent sm:text-[1.7rem]">
            {posts[0].title}
          </h3>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
            {excerpt(posts[0])}
          </p>
          <span className="mt-5 inline-block font-mono text-[0.7rem] tracking-[0.15em] uppercase text-accent">
            Devamını oku →
          </span>
        </Link>
      )}

      <div className="mt-2">
        {posts.slice(1).map((post, i) => (
          <article
            key={post.slug}
            className="fade-up group border-b py-6 last:border-b-0"
            style={{ animationDelay: `${0.03 + i * 0.05}s` }}
          >
            <Link href={`/posts/${post.slug}/`} className="block">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <time className="shrink-0 font-mono text-[0.72rem] text-faint">
                  {formatDate(post.date)}
                </time>
              </div>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                {excerpt(post)}
              </p>
            </Link>
          </article>
        ))}
      </div>

      {/* ── Diğer ── */}
      <h2 className="mt-16 mb-4 font-mono text-[0.75rem] tracking-[0.2em] text-muted uppercase">
        Diğer
      </h2>
      <p>
        <a
          href="/files/Temel_Sorunlar_Uzerine.pdf"
          className="text-accent underline decoration-faint underline-offset-4 hover:decoration-accent"
        >
          Temel Sorunlar Üzerine (PDF)
        </a>
      </p>
    </>
  );
}
