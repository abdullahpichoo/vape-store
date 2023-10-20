import BestSelling from "@/components/best-selling";
import Features from "@/components/features-section";
import HeroSection from "@/components/hero-section";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <BestSelling />
      <Features />
    </>
  );
}
