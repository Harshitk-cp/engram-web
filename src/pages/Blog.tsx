import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { getAllPosts, formatDate } from "../lib/blog";
import styles from "./Blog.module.css";

const SITE = "https://hakuya.ai";

export default function Blog() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Hakuya Blog",
    description:
      "Field notes on provable memory for AI agents — auditability, memory governance, belief dynamics, and building agents you can trust.",
    url: `${SITE}/blog`,
    publisher: { "@type": "Organization", name: "Hakuya", url: SITE },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE}/blog/${p.slug}`,
      author: { "@type": "Person", name: p.author },
    })),
  };

  return (
    <>
      <Seo
        title="Blog — Hakuya | Provable Memory for AI Agents"
        description="Field notes on provable memory for AI agents: auditability, memory governance, belief dynamics, and lessons from building agents you can trust in production."
        path="/blog"
        jsonLd={jsonLd}
      />

      <section className={styles.section}>
        <div className="container">
          <header className={styles.head}>
            <span className={styles.tag}>Blog</span>
            <h1 className={styles.title}>
              Notes on memory you can&nbsp;prove
            </h1>
            <p className={styles.intro}>
              We&apos;re building the trust layer for AI agents — provenance,
              audit trails, and memory that cleans up after itself. Here&apos;s
              what we&apos;re learning as we go: the failure modes, the design
              calls, and the occasionally uncomfortable truths about how agent
              memory really behaves in production.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className={styles.empty}>
              The first post is on its way. Check back soon.
            </p>
          ) : (
            <ul className={styles.grid}>
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className={styles.card}>
                    {p.cover && (
                      <img
                        src={p.cover}
                        alt=""
                        className={styles.cardCover}
                        loading="lazy"
                        width={1200}
                        height={630}
                      />
                    )}
                    <div className={styles.cardBody}>
                      <div className={styles.cardTags}>
                        {p.tags.slice(0, 3).map((t) => (
                          <span key={t} className={styles.pill}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <h2 className={styles.cardTitle}>{p.title}</h2>
                      <p className={styles.cardDesc}>{p.description}</p>
                      <div className={styles.cardMeta}>
                        <span>{p.author}</span>
                        <span className={styles.dot}>·</span>
                        <time dateTime={p.date}>{formatDate(p.date)}</time>
                        <span className={styles.dot}>·</span>
                        <span>{p.readingTime} min read</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
