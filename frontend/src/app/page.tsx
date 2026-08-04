import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WhyCharis } from "@/components/landing/WhyCharis";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Philosophy } from "@/components/landing/Philosophy";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA, Footer } from "@/components/landing/FinalCTA";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyCharis />
      <HowItWorks />
      <Philosophy />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
