import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { getPost, formatDate } from "../lib/blog";
import { GITHUB_URL, CONSOLE_URL } from "../constants/content";
import styles from "./BlogPost.module.css";

const SITE = "https://hakuya.ai";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <>
        <Seo
          title="Post not found — Hakuya Blog"
          description="This post could not be found."
          path={`/blog/${slug ?? ""}`}
          noindex
        />
        <section className={styles.section}>
          <div className="container">
            <div className={styles.missing}>
              <h1>We couldn&apos;t find that post</h1>
              <p>It may have moved or been renamed.</p>
              <Link to="/blog" className={styles.backLink}>
                ← Back to the blog
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const url = `${SITE}/blog/${post.slug}`;
  const image = post.cover
    ? post.cover.startsWith("http")
      ? post.cover
      : `${SITE}${post.cover}`
    : undefined;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        name: post.author,
        ...(post.authorRole ? { jobTitle: post.authorRole } : {}),
      },
      publisher: {
        "@type": "Organization",
        name: "Hakuya",
        url: SITE,
        logo: { "@type": "ImageObject", url: `${SITE}/favicon.svg` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      keywords: post.tags.join(", "),
      ...(image ? { image } : {}),
      wordCount: post.readingTime * 200,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={`${post.title} — Hakuya Blog`}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        image={image}
        jsonLd={jsonLd}
      />

      <article className={styles.section}>
        <div className={styles.column}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span className={styles.current}>{post.title}</span>
          </nav>

          <header className={styles.head}>
            <div className={styles.tags}>
              {post.tags.map((t) => (
                <span key={t} className={styles.pill}>
                  {t}
                </span>
              ))}
            </div>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.lede}>{post.description}</p>
            <div className={styles.byline}>
              <span className={styles.author}>{post.author}</span>
              {post.authorRole && (
                <span className={styles.role}>{post.authorRole}</span>
              )}
              <span className={styles.metaLine}>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className={styles.dot}>·</span>
                {post.readingTime} min read
              </span>
            </div>
          </header>

          {post.cover && (
            <img
              src={post.cover}
              alt=""
              className={styles.cover}
              loading="eager"
              width={1200}
              height={630}
            />
          )}

          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className={styles.footer}>
            <div className={styles.cta}>
              <h3>Build memory you can prove.</h3>
              <p>
                Hakuya is open source and free to self-host — one Docker Compose
                command to a production memory layer with a tamper-evident audit
                trail.
              </p>
              <div className={styles.ctaActions}>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  Star on GitHub
                </a>
                <a href={CONSOLE_URL} className={styles.btnSecondary}>
                  Get started
                </a>
              </div>
            </div>
            <Link to="/blog" className={styles.backLink}>
              ← Back to all posts
            </Link>
          </footer>
        </div>
      </article>
    </>
  );
}
