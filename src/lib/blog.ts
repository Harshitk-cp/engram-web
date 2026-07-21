import fm from "front-matter";
import { marked } from "marked";

export interface Post {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  tags: string[];
  author: string;
  authorRole?: string;
  /** Absolute or root-relative image path for OG / hero. */
  cover?: string;
  /** Estimated reading time in minutes. */
  readingTime: number;
  /** Rendered HTML body. */
  html: string;
  draft?: boolean;
}

interface FrontAttrs {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  author?: string;
  authorRole?: string;
  cover?: string;
  draft?: boolean;
}

// Eagerly pull every markdown file's raw text into the bundle. Vite resolves
// this at build time, so it works during both static generation (Node) and in
// the browser. Add a post by dropping a new .md file in src/content/blog/.
const raw = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

marked.setOptions({ gfm: true, breaks: false });

function slugFromPath(p: string): string {
  return p.split("/").pop()!.replace(/\.md$/, "");
}

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function build(): Post[] {
  const posts: Post[] = Object.entries(raw).map(([path, content]) => {
    const { attributes, body } = fm<FrontAttrs>(content);
    const slug = slugFromPath(path);
    return {
      slug,
      title: attributes.title ?? slug,
      description: attributes.description ?? "",
      date: attributes.date ?? "1970-01-01",
      tags: attributes.tags ?? [],
      author: attributes.author ?? "The Hakuya Team",
      authorRole: attributes.authorRole,
      cover: attributes.cover,
      readingTime: readingTime(body),
      html: marked.parse(body) as string,
      draft: attributes.draft ?? false,
    };
  });

  return posts
    .filter((p) => !p.draft || import.meta.env.DEV)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const ALL = build();

export function getAllPosts(): Post[] {
  return ALL;
}

export function getAllPostSlugs(): string[] {
  return ALL.map((p) => p.slug);
}

export function getPost(slug: string): Post | undefined {
  return ALL.find((p) => p.slug === slug);
}

export function getTags(): string[] {
  return [...new Set(ALL.flatMap((p) => p.tags))].sort();
}

/** Human-readable date, e.g. "July 14, 2026". Deterministic (UTC). */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
