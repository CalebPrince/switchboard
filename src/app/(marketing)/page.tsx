import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { ProductPreview } from "@/components/sections/product-preview";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Highlights } from "@/components/sections/highlights";
import { UseCases } from "@/components/sections/use-cases";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProductPreview />
        <LogoCloud />
        <Features />
        <HowItWorks />
        <Highlights />
        <UseCases />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
