---
title: "Whose memory is this? The boundary problem in every agent that serves more than one context"
description: "The moment an agent talks to more than one customer, user, or project, its memory starts leaking between them. It's a privacy problem and a correctness problem at once — and you can't prompt your way out of it. Here's the boundary that actually works."
date: "2026-07-09"
tags: ["agent memory", "multi-tenant", "privacy", "context isolation"]
author: "Harshit"
authorRole: "Founder, Hakuya"
cover: "/blog-covers/whose-memory-is-this.png"
---

Give an agent memory and it gets more useful fast. Give that same agent a *second* person to talk to, and something quietly breaks: it starts mixing them up.

A support agent learns that one customer is on the enterprise plan and cancels often — then brings that up, warmly, to a different customer. A personal assistant hears about your job hunt on Monday and mentions it during a family planning chat on Saturday. A multi-tenant SaaS agent trained on one company's data recalls it for another. A coding assistant that helped you on one project suggests that project's conventions while you're deep in a completely different one.

None of these are exotic. They're the *default* behavior of almost every agent memory system, and they're the same bug wearing different clothes: **the memory has no idea who it's about.**

## Memory records who *made* it, not who it's *about*

Most agent memory is built like this: pull facts out of a conversation, embed them, store them, retrieve by similarity later. The record remembers *which agent* formed it. It almost never remembers *who or what the memory concerns.*

That missing field is the whole problem. When one agent talks to thousands of people, and every memory floats free of any referent, retrieval genuinely cannot tell whose memory is whose. So it returns whatever is most similar — and "most similar" doesn't respect the boundary between customer A and customer B, or between your work life and your home life.

Teams usually reach for one of two workarounds, and both are broken:

- **One agent per person.** Now you have a thousand agents, none of which share anything, and no clean way to hold general knowledge. It's conceptually wrong and operationally unbounded.
- **One shared pool.** Everything bleeds into everything. Convenient, and a privacy incident waiting to happen.

## The fix: give every memory something to hold onto

The real fix is to stop treating "who it's about" as an afterthought and make it a first-class part of every memory. Each fact gets bound to a **subject** — a customer, a user, an account, a project — and recall is scoped by that subject. Customer A's conversation only ever surfaces customer A's memories. The work assistant only sees the work context.

That one change turns a landfill-with-a-search-bar into something you can actually reason about. It's also what makes a genuinely hard requirement possible: **erasing everything about one person on request.** When memory is scoped by subject, "forget this customer" is a real, verifiable operation. When it's a shared pile, it's a prayer — and regulators (GDPR Article 17, the EU AI Act) increasingly assume you've solved it.

## The part everyone gets wrong: draw the boundary in your architecture, not your prompt

Here's the trap. Once you know memory should be scoped by subject, the tempting next move is to make the *model* responsible for it — *"remember to tag each memory with the right customer."*

Don't. Isolation between people is a **correctness and privacy property**, and you never hang a correctness property on a language model remembering to pass a parameter. It will forget. And the first time it does, one person's data lands in another person's memory, silently, with no error and no alarm.

The boundary belongs one layer down, where it can be enforced *by construction*: you tell the memory who the conversation is about — a customer id, a tenant, a project — when the connection or session is set up, not by trusting the model to annotate every write. The scope becomes a property of *the context the agent is running in*, which is deterministic, instead of *the model's discretion*, which is not.

The right shape is a **default with an override**: the environment sets the subject as a floor that always applies, and the agent can still narrow it further when it genuinely needs to. Default does the load-bearing work; the override is a bonus. What you don't do is force a subject onto literally everything — some knowledge really is general ("this company's refund policy," "the assistant's own style") and shouldn't be jammed into one person's file.

## Two things worth knowing before you build this

**Scoped recall should be strict, and shared truth needs a home.** If a subject is active, recall should return *that subject's* memories — not quietly fold in everyone else's. But that means genuinely shared knowledge — org-wide policies, product facts, the assistant's own conventions — needs a separate, always-available lane, or it disappears the moment you scope a conversation. (We call that lane *canon*; whatever you call it, plan for it.)

**Scoping is not the same as cleaning.** Keeping people's memories apart is orthogonal to keeping each person's memory *fresh* — pruning stale facts, resolving contradictions, letting old beliefs fade. You want both. A perfectly isolated memory that's full of a single customer's contradictory, months-out-of-date facts is still a bad memory.

## The short version

- The failure — agents mixing up who they're talking to — comes from memory that records *who made it*, not *who it's about*.
- Fix it by binding every memory to a **subject** and scoping recall to that subject. You get isolation *and* real per-person erasure.
- Enforce the boundary **in your architecture**, not in the model's prompt. Isolation is a correctness property; the model will forget.
- Make it a **default with an override**, keep a lane for genuinely shared knowledge, and remember that scoping and self-cleaning are two different jobs.

This is the problem we built Hakuya around — subjects with strict isolation, provable per-subject erasure, and a shared canon, on top of a memory that actually cleans itself. If it resonates, [come find the project on GitHub](https://github.com/Harshitk-cp/engram); we'd genuinely like to hear how your agents are getting confused about who they're talking to.
