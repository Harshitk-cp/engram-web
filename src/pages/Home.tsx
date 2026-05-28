import Hero from "../components/sections/Hero";
import Metrics from "../components/sections/Metrics";
import Features from "../components/sections/Features";
import MemorySystems from "../components/sections/MemorySystems";
import Comparison from "../components/sections/Comparison";
import ForYou from "../components/sections/ForYou";
import HowItWorks from "../components/sections/HowItWorks";
import Quickstart from "../components/sections/Quickstart";
import Contact from "../components/sections/Contact";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <Features />
      <MemorySystems />
      <Comparison />
      <ForYou />
      <HowItWorks />
      <Quickstart />
      <Contact />
      <CTA />
    </>
  );
}
