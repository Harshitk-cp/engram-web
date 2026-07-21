// Regenerates dist/sitemap.xml after the static build so every blog post is
// listed with its real publish date. Run automatically by `npm run build`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const SITE = "https://hakuya.ai";
const blogDir = path.join(root, "src/content/blog");
const outFile = path.join(root, "dist/sitemap.xml");

/** Pull `date:` and `draft:` out of a markdown file's frontmatter. */
function parseFront(md) {
  const m = md.match(/^---\s*([\s\S]*?)\s*---/);
  const front = m ? m[1] : "";
  const date = (front.match(/date:\s*["']?(\d{4}-\d{2}-\d{2})/) || [])[1];
  const draft = /draft:\s*true/.test(front);
  return { date, draft };
}

const posts = fs.existsSync(blogDir)
  ? fs
      .readdirSync(blogDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const { date, draft } = parseFront(
          fs.readFileSync(path.join(blogDir, f), "utf8"),
        );
        return { slug: f.replace(/\.md$/, ""), date: date || "2026-01-01", draft };
      })
      .filter((p) => !p.draft)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  : [];

const latestPost = posts[0]?.date || new Date().toISOString().slice(0, 10);

const urls = [
  { loc: "/", lastmod: latestPost, changefreq: "weekly", priority: "1.0" },
  { loc: "/blog", lastmod: latestPost, changefreq: "weekly", priority: "0.9" },
  ...posts.map((p) => ({
    loc: `/blog/${p.slug}`,
    lastmod: p.date,
    changefreq: "monthly",
    priority: "0.8",
  })),
  { loc: "/privacy", lastmod: "2026-06-20", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms", lastmod: "2026-06-20", changefreq: "yearly", priority: "0.3" },
  { loc: "/refunds", lastmod: "2026-06-20", changefreq: "yearly", priority: "0.3" },
  { loc: "/contact", lastmod: "2026-06-20", changefreq: "yearly", priority: "0.3" },
  { loc: "/llms.txt", lastmod: latestPost, changefreq: "monthly", priority: "0.5" },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, xml);
console.log(`sitemap.xml written with ${urls.length} URLs (${posts.length} posts)`);
