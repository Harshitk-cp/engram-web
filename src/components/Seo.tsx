import { Head } from "vite-react-ssg";

const SITE = "https://hakuya.ai";
const DEFAULT_OG = "/og-cover.png";

interface SeoProps {
  /** Full <title>. Include the brand yourself for full control. */
  title: string;
  description: string;
  /** Path (e.g. "/blog") or absolute URL. Becomes the canonical + og:url. */
  path: string;
  type?: "website" | "article";
  /** Absolute or root-relative OG image. Falls back to the brand card. */
  image?: string;
  /** Marks the page noindex (e.g. thin/utility pages). */
  noindex?: boolean;
  /** Optional JSON-LD object rendered into <head>. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

// Per-page head management. vite-react-ssg's <Head> (react-helmet-async) writes
// these tags into the static HTML at build time, so crawlers get a real,
// page-specific title/description/canonical without executing any JavaScript.
export default function Seo({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG,
  noindex,
  jsonLd,
}: SeoProps) {
  const url = path.startsWith("http") ? path : `${SITE}${path}`;
  const img = image.startsWith("http") ? image : `${SITE}${image}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noindex ? "noindex, follow" : "index, follow"}
      />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Hakuya" />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  );
}
