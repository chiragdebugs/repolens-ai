import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustedBy } from "@/components/TrustedBy";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 aurora-gradient">
        <Hero />
        <TrustedBy />
        <div className="bg-background">
          <Features />
          <HowItWorks />
        </div>
      </main>
      <Footer />
    </>
  );
}
