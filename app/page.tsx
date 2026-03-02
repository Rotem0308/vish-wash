import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import TrustSection from "@/components/TrustSection";
import ServicesSection from "@/components/ServicesSection";
import ImageCarousel from "@/components/ImageCarousel";
import CtaSection from "@/components/CtaSection";
import ChecklistSection from "@/components/ChecklistSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <TrustSection />
      <ServicesSection />
      <ImageCarousel />
      <CtaSection />
      <ChecklistSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
