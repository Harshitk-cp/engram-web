import Hero from "../components/sections/Hero";
import Metrics from "../components/sections/Metrics";
import Trust from "../components/sections/Trust";
import Problem from "../components/sections/Problem";
import Features from "../components/sections/Features";
import MemorySystems from "../components/sections/MemorySystems";
import Comparison from "../components/sections/Comparison";
import Benchmarks from "../components/sections/Benchmarks";
import ForYou from "../components/sections/ForYou";
import Pricing from "../components/sections/Pricing";
import HowItWorks from "../components/sections/HowItWorks";
import Quickstart from "../components/sections/Quickstart";
import Contact from "../components/sections/Contact";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";
import Seo from "../components/Seo";

export default function Home() {
  return (
    <>
      <Seo
        title="Hakuya — Provable Agent Memory | Open Source"
        description="Hakuya is open-source agent memory you can prove: write-provenance on every belief, a tamper-evident SHA-256 audit trail, verified per-subject erasure (GDPR / EU AI Act), and self-cleaning memory decay. The trust layer for production AI agents."
        path="/"
      />
      <Hero />
      <Metrics />
      <Trust />
      <Problem />
      <Features />
      <MemorySystems />
      <Comparison />
      <Benchmarks />
      <ForYou />
      <Pricing />
      <HowItWorks />
      <Quickstart />
      <Contact />
      <FAQ />
      <CTA />
    </>
  );
}
