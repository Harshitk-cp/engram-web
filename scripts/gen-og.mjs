// Generates the default social-share card at public/og-cover.png (1200x630).
// Text-forward brand card — designed in code (not AI) so the type stays crisp.
// Re-run after brand/copy changes:  node scripts/gen-og.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, "../public/og-cover.png");

const W = 1200;
const H = 630;

// Decorative "memory graph" nodes in the lower-right, echoing the logo mark.
const nodes = [
  { x: 902, y: 250, r: 6, o: 0.9 },
  { x: 1010, y: 190, r: 9, o: 1 },
  { x: 1104, y: 300, r: 5, o: 0.7 },
  { x: 980, y: 360, r: 7, o: 0.85 },
  { x: 1088, y: 430, r: 6, o: 0.75 },
  { x: 900, y: 430, r: 4, o: 0.6 },
];
const edges = [
  [1, 0],
  [1, 2],
  [1, 3],
  [3, 4],
  [3, 5],
  [2, 4],
];

const graphEdges = edges
  .map(([a, b]) => {
    const p = nodes[a];
    const q = nodes[b];
    return `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="url(#acc)" stroke-width="1.5" opacity="0.28"/>`;
  })
  .join("");
const graphNodes = nodes
  .map(
    (n) =>
      `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="url(#acc)" opacity="${n.o}"/>`,
  )
  .join("");

// Faint vertical grid lines like the site background.
let grid = "";
for (let x = 0; x <= W; x += 60) {
  grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#ffffff" stroke-width="1" opacity="0.02"/>`;
}
for (let y = 0; y <= H; y += 60) {
  grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#ffffff" stroke-width="1" opacity="0.02"/>`;
}

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="acc" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#a78bfa"/>
      <stop offset="1" stop-color="#6366f1"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.18" cy="0.15" r="0.9">
      <stop offset="0" stop-color="#6366f1" stop-opacity="0.28"/>
      <stop offset="0.5" stop-color="#6366f1" stop-opacity="0.05"/>
      <stop offset="1" stop-color="#6366f1" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="#09090b"/>
  ${grid}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${W}" height="6" fill="url(#acc)"/>

  ${graphEdges}
  ${graphNodes}

  <!-- Brand -->
  <g transform="translate(80,64) scale(1.5)">
    <circle cx="16" cy="16" r="14" stroke="url(#acc)" stroke-width="2" fill="none"/>
    <circle cx="16" cy="10" r="3" fill="url(#acc)"/>
    <circle cx="10" cy="20" r="2.5" fill="url(#acc)" opacity="0.7"/>
    <circle cx="22" cy="20" r="2.5" fill="url(#acc)" opacity="0.7"/>
    <line x1="16" y1="13" x2="11" y2="18" stroke="url(#acc)" stroke-width="1.5" opacity="0.5"/>
    <line x1="16" y1="13" x2="21" y2="18" stroke="url(#acc)" stroke-width="1.5" opacity="0.5"/>
    <line x1="12" y1="20" x2="20" y2="20" stroke="url(#acc)" stroke-width="1" opacity="0.35"/>
  </g>
  <text x="142" y="98" font-family="Helvetica Neue, Arial" font-size="34" font-weight="600" fill="#f4f4f5" letter-spacing="0.5">hakuya</text>

  <!-- Headline -->
  <text x="78" y="316" font-family="Helvetica Neue, Arial" font-size="92" font-weight="700" letter-spacing="-3" fill="#f4f4f5">A memory your AI</text>
  <text x="78" y="418" font-family="Helvetica Neue, Arial" font-size="92" font-weight="700" letter-spacing="-3" fill="#f4f4f5"><tspan fill="url(#acc)">won't make up.</tspan></text>

  <!-- Sub-line -->
  <text x="80" y="486" font-family="Helvetica Neue, Arial" font-size="27" font-weight="400" fill="#a1a1aa" letter-spacing="0.2">Remembers what matters  ·  forgets what's stale  ·  proves what it knows</text>

  <!-- Footer -->
  <text x="80" y="566" font-family="Helvetica Neue, Arial" font-size="26" font-weight="600" fill="#818cf8">hakuya.ai</text>
  <text x="${W - 80}" y="566" text-anchor="end" font-family="Helvetica Neue, Arial" font-size="24" font-weight="400" fill="#71717a">Open source · self-hostable</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { loadSystemFonts: true, defaultFontFamily: "Helvetica Neue" },
  background: "#09090b",
});
const png = resvg.render().asPng();
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, png);
console.log(`og-cover.png written (${(png.length / 1024).toFixed(0)} KB, ${W}x${H})`);
