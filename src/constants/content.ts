export const GITHUB_URL = "https://github.com/Harshitk-cp/engram";

export const DOCS_URL = "https://docs.hakuya.ai";

export const CONSOLE_URL = import.meta.env.VITE_CONSOLE_URL ?? "https://console.hakuya.ai";

// `to` is route-prefixed ("/#features") so these work from any page, not just
// the landing page. App's scroll handler scrolls to the section after routing.
export const NAV_LINKS = [
  { label: "Trust", to: "/#trust" },
  { label: "Features", to: "/#features" },
  { label: "Memory Systems", to: "/#memory-systems" },
  { label: "Benchmarks", to: "/#benchmarks" },
  { label: "Pricing", to: "/#pricing" },
  { label: "Blog", to: "/blog" },
  { label: "Quickstart", to: "/#quickstart" },
] as const;

export const METRICS = [
  { value: "Never", label: "forgets what matters" },
  { value: "91.4%", label: "answer accuracy" },
  { value: "Tamper-proof", label: "every change tracked" },
  { value: "GDPR-ready", label: "erase any user on request" },
  { value: "Instant", label: "recall, even at scale" },
  { value: "No lock-in", label: "open & self-hostable" },
] as const;

// Flagship "Trust & Governance" pillars — the real, shipped differentiators.
export const TRUST_PILLARS = [
  {
    title: "Provenance on every belief",
    description:
      "Each memory carries its source, evidence type, and confidence. You can always answer where a belief came from and why the agent holds it — the foundation for trusting, or distrusting, what an agent remembers.",
    icon: "shield",
    color: "purple" as const,
  },
  {
    title: "Tamper-evident audit trail",
    description:
      "Every belief change that matters — created, reinforced, contradicted, redacted, erased — is sealed in a per-tenant SHA-256 hash-chained log. Verify the whole chain in one call; export a signed record for SOC 2 / HIPAA review. Edit, reorder, or drop a single row and verification fails.",
    icon: "chain",
    color: "blue" as const,
  },
  {
    title: "Verified per-subject erasure",
    description:
      "Cryptographically shred everything Hakuya holds about one customer, patient, or guest — and keep a provable record that you did. Right-to-be-forgotten that survives an append-only audit log. Built for GDPR Article 17 and the EU AI Act.",
    icon: "key",
    color: "indigo" as const,
  },
  {
    title: "Self-cleaning memory",
    description:
      "Stale beliefs lose confidence; redundant ones suppress each other through competition-aware decay. Other stores accumulate junk — one public audit of a leading memory layer found 97.8% of entries were garbage after a month. Hakuya's memory stays clean on its own.",
    icon: "broom",
    color: "violet" as const,
  },
] as const;

export const FEATURES = [
  {
    title: "Tiered Memory",
    description:
      "Memories auto-tier by confidence: Hot memories inject into every prompt. Cold ones surface only when relevant. Archives decay gracefully.",
    icon: "layers",
    color: "purple" as const,
  },
  {
    title: "Belief Dynamics",
    description:
      "Confidence updates via Bayesian log-odds. Reinforced memories grow stronger. Contradicted ones weaken. Unused ones decay naturally.",
    icon: "clock",
    color: "blue" as const,
  },
  {
    title: "Hybrid Retrieval",
    description:
      "Every recall combines vector similarity with graph traversal. Navigate entity relationships up to 2 hops deep for richer context.",
    icon: "graph",
    color: "indigo" as const,
  },
  {
    title: "Conversation Extraction",
    description:
      "Automatically extract memories from conversations. LLM-powered classification detects preferences, facts, decisions, and constraints.",
    icon: "chat",
    color: "violet" as const,
  },
  {
    title: "Procedural Learning",
    description:
      "Agents learn skills from successful episodes. Trigger-action patterns are extracted, versioned, and matched to new situations.",
    icon: "procedure",
    color: "fuchsia" as const,
  },
  {
    title: "Metacognition",
    description:
      "Agents assess their own knowledge quality. Detect gaps, measure confidence per query, and flag uncertainty in novel situations.",
    icon: "brain",
    color: "rose" as const,
  },
] as const;

export const MEMORY_SYSTEMS = [
  {
    type: "Semantic",
    title: "Facts & Beliefs",
    description:
      "Persistent knowledge about users, preferences, constraints, and decisions. Typed and confidence-scored.",
    example: '"User prefers dark mode"',
    badge: "0.92",
    color: "purple" as const,
  },
  {
    type: "Episodic",
    title: "Experiences",
    description:
      "Rich records of past interactions with full context: emotions, entities, causal links, and outcomes.",
    example: '"Helped debug auth flow"',
    badge: "success",
    color: "blue" as const,
  },
  {
    type: "Procedural",
    title: "Learned Skills",
    description:
      "Trigger-action patterns extracted from successful episodes. Matched to new situations for better responses.",
    example: '"When error → check logs first"',
    badge: "87%",
    color: "indigo" as const,
  },
  {
    type: "Working",
    title: "Active Context",
    description:
      "7-slot active memory for current goals, reasoning state, and recent messages. Mirrors human working memory capacity.",
    example: '"Current goal: fix login bug"',
    badge: "active",
    color: "violet" as const,
  },
] as const;

export const PERSONAS = [
  {
    title: "Agent & copilot builders",
    description:
      "Building assistants, copilots, or agents — in code or on an agentic / no-code platform — that work with people over days, weeks, and months.",
    example:
      "A support agent that remembers a customer prefers email over chat, avoids suggesting products they already rejected, and learns which troubleshooting steps work best.",
    icon: "users",
  },
  {
    title: "LLM App Builders",
    description:
      "Shipping products powered by language models that need persistent user context beyond a single session.",
    example:
      "A coding assistant that remembers your project conventions, preferred frameworks, and past architectural decisions — so you stop repeating yourself.",
    icon: "monitor",
  },
  {
    title: "Multi-Agent Systems",
    description:
      "Orchestrating multiple agents that need shared memory with automatic conflict resolution and belief updates.",
    example:
      "A research pipeline where one agent gathers data, another analyzes it, and a third writes reports — all sharing evolving knowledge about the topic.",
    icon: "stack",
  },
  {
    title: "Research Teams",
    description:
      "Implementing cognitive architectures grounded in peer-reviewed research: CoALA, Mem0, ACT-R, MUSE.",
    example:
      "Testing how different memory decay rates and confidence thresholds affect agent performance on long-horizon reasoning benchmarks.",
    icon: "book",
  },
] as const;

export const NOT_FOR_YOU = [
  "Only need simple key-value storage",
  "Want a standalone vector database",
  "Are building single-turn, stateless bots",
] as const;

export const TECH_STACK = [
  { name: "Go", desc: "Single binary, zero runtime deps" },
  { name: "PostgreSQL", desc: "Battle-tested relational storage" },
  { name: "pgvector", desc: "Native vector similarity search" },
  { name: "OpenAI", desc: "Embeddings + classification" },
  { name: "Multi-LLM", desc: "Anthropic, Gemini, Cerebras" },
  { name: "Docker", desc: "One command to production" },
] as const;

export const BENCHMARK_HEADLINE = {
  overall: "91.4%",
  overallSub: "Overall accuracy",
  dataset: "LongMemEval",
  datasetSub: "ICLR 2025 · histories scalable past 1M tokens",
} as const;

// LongMemEval per-task results. score is the headline %, frac the raw count.
export const BENCHMARK_TASKS = [
  {
    task: "Knowledge update",
    score: 100.0,
    frac: "72/72",
    tests: "When a fact changes over time, answer with the current value and ignore the superseded one.",
  },
  {
    task: "Abstention",
    score: 100.0,
    frac: "30/30",
    tests: "Recognise an unanswerable question and decline, instead of hallucinating an answer.",
  },
  {
    task: "Single-session · user fact",
    score: 98.4,
    frac: "63/64",
    tests: "Recall a specific fact the user stated within one conversation.",
  },
  {
    task: "Single-session · preference",
    score: 93.3,
    frac: "28/30",
    tests: "Surface a user preference, whether stated outright or implied by repeated behaviour.",
  },
  {
    task: "Multi-session",
    score: 90.2,
    frac: "109/121",
    tests: "Combine and aggregate facts that are spread across many separate conversations.",
  },
  {
    task: "Single-session · assistant",
    score: 89.3,
    frac: "50/56",
    tests: "Recall something the assistant said, recommended, or listed earlier in a session.",
  },
  {
    task: "Temporal reasoning",
    score: 82.3,
    frac: "102/124",
    tests: "Reason about when events happened — order, duration, and 'how long ago' across sessions.",
  },
] as const;

// FAQ shown on the homepage. The FAQPage JSON-LD is generated from this exact
// list (see FAQ section), so the visible answers and the structured data can
// never drift apart — which is what Google wants to see.
export const FAQ_ITEMS = [
  {
    q: "How does my agent actually remember and recall things?",
    a: "Two moves. When something matters, your agent calls remember to save it — or Hakuya extracts it from the conversation for you. When it needs context, it calls recall with a plain-language query like \"what do I know about this customer's billing?\" and gets back the most relevant memories, ranked by how confident and how recent they are. Hakuya can also auto-inject the most important memories into the prompt, so the agent walks in already knowing.",
  },
  {
    q: "What does Hakuya do better than just using a vector database?",
    a: "A vector database stores text and finds similar text — that's it. It never forgets, never notices when two memories contradict, and will happily hand back a fact that stopped being true six months ago. Hakuya adds the judgment on top: it lets stale memories fade, catches and resolves contradictions, ranks by confidence and recency instead of raw similarity, and records where every fact came from. You get the memory your agent should act on, not just the closest string match.",
  },
  {
    q: "Will it stop my agent from confidently giving outdated or made-up answers?",
    a: "That's the whole point. Because stale memories lose confidence and fresh ones win recall, your agent stops citing a plan the customer already upgraded from, a preference they changed, or a fact that's no longer true. And when it genuinely doesn't know, low confidence lets it say so instead of inventing an answer — \"confidently wrong\" is exactly the failure mode Hakuya is built to prevent.",
  },
  {
    q: "How does it decide what to keep and what to forget?",
    a: "Every memory has a confidence score that moves with evidence. Use or confirm a belief and it strengthens; contradict it and it weakens; leave it untouched and it slowly decays. Repeats of the same fact collapse into one strong memory instead of a pile of noisy duplicates. So the store gets cleaner the more it's used — you never run a cleanup job.",
  },
  {
    q: "Can one agent serve thousands of users without mixing up their memories?",
    a: "Yes. Each end-user — a customer, patient, or guest — gets an isolated space, so what your agent remembers about one person never leaks into another's, even though it's all one deployment. You can also share company-wide facts that everyone should know alongside the per-user memory. It's built for one support or concierge agent serving thousands of people.",
  },
  {
    q: "How do I add Hakuya to my agent?",
    a: "Pick whatever fits your stack: an MCP server that drops straight into Claude Desktop, Claude Code, Cursor, and Windsurf (memory just works, no glue code), a REST API, a Python SDK, or a LangChain integration. Point your agent at the endpoint and remembering and recall are available immediately — you don't have to build a memory pipeline yourself.",
  },
  {
    q: "Can I delete everything about one user — and prove that I did?",
    a: "One call erases everything tied to a single user and keeps a verifiable record that the data existed and was removed. That's genuine right-to-be-forgotten (GDPR / EU AI Act) that survives an append-only log — the reason teams in health, finance, and legal can actually put an agent in front of real customers.",
  },
  {
    q: "Is it free? Can I self-host?",
    a: "Yes to both. Hakuya is open source and free to run yourself with a single command — your data never leaves your infrastructure. If you'd rather not operate it, there's a managed cloud with a free tier to start and paid plans as you scale.",
  },
] as const;

export const FLOW_STEPS = [
  {
    number: "01",
    title: "Store",
    description:
      "Memories are stored with type, content, and provenance. Embeddings are generated automatically. Entities and relationships are extracted into the graph.",
  },
  {
    number: "02",
    title: "Recall",
    description:
      "Hybrid retrieval combines vector similarity with graph traversal. Hot memories auto-inject. Results are ranked by relevance, recency, and confidence.",
  },
  {
    number: "03",
    title: "Evolve",
    description:
      "Feedback updates confidence via log-odds. Reinforced memories tier up. Contradictions trigger review. Unused memories decay toward archive.",
  },
] as const;
