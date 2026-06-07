export const GITHUB_URL = "https://github.com/Harshitk-cp/engram";

export const DOCS_URL = "https://docs.hakuya.ai";

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Memory Systems", href: "#memory-systems" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Pricing", href: "#pricing" },
  { label: "Quickstart", href: "#quickstart" },
  { label: "Contact", href: "#contact" },
] as const;

export const METRICS = [
  { value: "91.4%", label: "LongMemEval accuracy" },
  { value: "<10ms", label: "p95 recall latency" },
  { value: "4", label: "cognitive memory types" },
  { value: "2-hop", label: "graph traversal depth" },
  { value: "Apache-2.0", label: "open source" },
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
    title: "AI Agent Developers",
    description:
      "Building conversational agents, copilots, or assistants that interact with users over days, weeks, or months.",
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
