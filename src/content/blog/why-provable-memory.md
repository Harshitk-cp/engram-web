---
title: "Why we built provable memory for AI agents"
description: "Most agent memory asks you to trust a black box. We think memory you can't audit is a liability, not a feature — so we built the one you can prove. Here's the case for provable memory."
date: "2026-07-14"
tags: ["provable memory", "AI agents", "trust"]
author: "Harshit"
authorRole: "Founder, Hakuya"
cover: "/blog-covers/why-provable-memory.jpg"
---

There's a moment every team building on AI agents eventually hits. An agent does something confidently wrong — tells a customer the opposite of what they said last week, "remembers" a preference nobody ever set, quietly acts on a fact that was true three months ago and isn't anymore. You go looking for why. And you find that you can't.

That's the moment we built Hakuya for.

## Storage was never the hard part

The first wave of agent memory tools solved a real problem: give an agent somewhere to put things and a way to get them back. Vector databases, retrieval pipelines, a growing pile of "memory layers" — they all answer the same question, which is *where do I keep this and how do I find it later*.

That's necessary. It's just not sufficient. Because the questions that actually keep you up at night when an agent is in production aren't about storage. They're about trust:

- **Where did this belief come from?** Did the user tell us, did we infer it, or did it walk in from some scraped web page?
- **Is it still true?** Or has the agent been confidently repeating something stale for weeks?
- **Can we prove what the agent knew, and when?** When a regulator, a customer, or your own incident review asks, can you show them — or are you guessing?
- **Can we actually erase someone?** Not "delete the row and hope," but prove that everything derived from a person is gone.

None of those are retrieval questions. They're *governance* questions. And a store that only knows how to save and search can't answer a single one of them.

## Memory you can't audit is a liability

Here's the uncomfortable framing we kept coming back to: an agent's memory is a database of claims your software will act on without asking. If you can't inspect where those claims came from, whether they're current, and what happened to them over time, you haven't built a feature. You've built a liability that compounds silently until the day it doesn't.

We've seen public audits of popular memory layers where the overwhelming majority of stored entries were junk after a month — contradictions living side by side, stale facts outranking fresh ones, no way to tell provenance apart. That's not a bug in one product. It's what happens when memory grows without accountability built into its foundation.

So we inverted the design. Instead of adding governance on top of a store, we made accountability the substrate everything else sits on.

## What "provable" actually means

Provable isn't a vibe. In Hakuya it's four concrete, shipped properties:

**Provenance on every belief.** Each memory carries its source, its evidence type, and a confidence score. You can always answer *why* the agent holds a belief — and, just as importantly, decide not to trust one.

**A tamper-evident audit trail.** Every change that matters — created, reinforced, contradicted, redacted, erased — is sealed in a per-tenant, SHA-256 hash-chained log. You can verify the whole chain in a single call and export a signed record for a SOC 2 or HIPAA review. Reorder one row, edit one field, drop one entry, and verification fails. The history isn't a log you're asked to trust; it's a log you can check.

**Verified per-subject erasure.** You can cryptographically shred everything Hakuya holds about one customer, patient, or guest — and keep a provable record that you did it. Right-to-be-forgotten that survives an append-only audit log is a genuinely hard problem, and it's the kind of thing GDPR Article 17 and the EU AI Act increasingly assume you've solved.

**Self-cleaning memory.** Stale beliefs lose confidence over time; redundant ones suppress each other through competition-aware decay. The memory stays clean on its own instead of accreting garbage until someone notices.

Underneath all of that is a real cognitive engine — semantic, episodic, procedural, and working memory; belief dynamics that strengthen what's reinforced and weaken what's contradicted; hybrid vector-plus-graph retrieval at sub-10ms p95. But the engine isn't the pitch. Plenty of things can retrieve. The point is that everything the engine does is accountable.

## Who this is for

If you're prototyping a weekend chatbot, you don't need any of this, and we'd rather you spent your time shipping. Provable memory earns its keep the moment an agent's mistakes start costing something real — money, a compliance finding, a customer's trust. That's health, finance, and legal teams who need auditable agent memory by default. It's B2B products running one agent across thousands of isolated end-users. It's anyone who has already had the "why did it do that, and can we prove it won't again" conversation.

## Where we're going

We're building Hakuya in the open — Apache-2.0, self-hostable with a single Docker Compose command, no external runtime dependency beyond Postgres. This blog is where we'll think out loud as we go: the failure modes we hit, the design calls we make, and the occasionally uncomfortable truths about how agent memory really behaves once it's carrying real weight.

If any of this resonates — if you've had that "why did it do that" moment — [come find the project on GitHub](https://github.com/Harshitk-cp/engram). We'd genuinely love to hear how your agents are failing. It's how we figure out what to build next.
