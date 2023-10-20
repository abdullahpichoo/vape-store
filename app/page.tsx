import BestSelling from "@/components/best-selling";
import Featured from "@/components/featured-products-section";
import Features from "@/components/features-section";
import HeroSection from "@/components/hero-section";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <HeroSection />
        <BestSelling />
        <Features />
        <Featured />
      </div>
    </>
  );
}
