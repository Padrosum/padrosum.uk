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
      {/* ── Header ── */}
      <header className="relative border-b border-border pt-20 pb-12 after:absolute after:-bottom-px after:left-0 after:h-[2px] after:w-20 after:bg-gold">
        <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-bold tracking-[0.04em] text-cream">
          Alihan <span className="text-gold">Padros</span> Karakuş
        </h1>
        <p className="mt-2 font-mono text-[0.72rem] tracking-[0.15em] uppercase text-gold-dim">
          Felsefe · İlahiyat · CS · Mitoloji
        </p>
      </header>

      {/* ── YAML kartı ── */}
      <div
        role="complementary"
        aria-label="Profil bilgisi"
        className="my-10 border border-border border-l-[3px] border-l-gold bg-bg3 px-7 py-6 font-mono text-[0.78rem] leading-[1.9] text-text-dim"
      >
        {profile.map(([key, val]) => (
          <div key={key}>
            <span className="text-gold">{key}</span>
            <span className="text-muted">: </span>
            <span className="text-cream">{val}</span>
          </div>
        ))}
      </div>

      {/* ── Bio ── */}
      <div className="prose mb-8 text-[1.05rem]">
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
          <span className="inline-block border border-gold-dim bg-surface px-3 py-0.5 font-mono text-[0.78rem] tracking-[0.04em] text-gold no-underline">
            padrosum@disroot.org
          </span>{" "}
          — bu adres üzerinden XMPP protokolünde de bir hesabım mevcuttur.
        </p>
      </div>

      {/* ── Blog ── */}
      <div className="mt-20 mb-10 flex items-center gap-4 font-display text-[0.7rem] tracking-[0.3em] uppercase text-gold after:h-px after:flex-1 after:bg-border">
        Blog
      </div>

      <div>
        {posts.map((post, i) => (
          <article
            key={post.slug}
            className="fade-up group border-b border-border py-9 last:border-b-0"
            style={{ animationDelay: `${0.05 + i * 0.07}s` }}
          >
            <Link href={`/posts/${post.slug}/`} className="block">
              <div className="mb-3 flex flex-wrap items-baseline gap-x-4 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-gold-dim">
                <span>{formatDate(post.date)}</span>
                <span className="text-muted">{post.readingMinutes} dk okuma</span>
                {post.type && <span className="text-accent">{post.type}</span>}
              </div>
              <h2 className="font-display text-[clamp(1.15rem,2.5vw,1.5rem)] leading-[1.25] font-semibold text-cream transition-colors group-hover:text-gold">
                {post.title}
              </h2>
              <p className="mt-3 text-[0.95rem] leading-[1.75] text-text-dim">
                {excerpt(post)}
              </p>
              <span className="mt-3 inline-block font-mono text-[0.65rem] tracking-[0.15em] uppercase text-gold-dim transition-colors group-hover:text-gold">
                Okumaya devam et →
              </span>
            </Link>
          </article>
        ))}
      </div>

      {/* ── Diğer ── */}
      <div className="mt-16 mb-6 flex items-center gap-4 font-display text-[0.7rem] tracking-[0.3em] uppercase text-gold after:h-px after:flex-1 after:bg-border">
        Diğer
      </div>
      <p className="font-mono text-[0.78rem] text-text-dim">
        <a
          href="/files/Temel_Sorunlar_Uzerine.pdf"
          className="text-gold-dim underline decoration-gold-dim/50 underline-offset-4 hover:text-gold"
        >
          Temel Sorunlar Üzerine (PDF)
        </a>
      </p>
    </>
  );
}
