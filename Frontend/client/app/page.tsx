import Hero from "@/app/components/landing/Hero";
import HowItWork from "@/app/components/landing/howItWork";
import AIDemo from "@/app/components/landing/AIdemo";
import Features from "@/app/components/landing/Features";
//import WhyNavGati from "@/app/components/landing/whyNavGati";
import FAQ from "@/app/components/landing/FAQ";
//import Footer from "@/app/components/common/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWork />
      <AIDemo/>
      <Features />
      <FAQ />
    </>
  );
}
