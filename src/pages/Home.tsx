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
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <>
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
      <CTA />
    </>
  );
}
