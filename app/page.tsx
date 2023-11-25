import AgeVerify from "@/components/age-verify";
import BestSelling from "@/components/best-selling";
import FeaturedBrands from "@/components/featured-brands-section";
import FeaturedProducts from "@/components/featured-products-section";
import ServerFeaturedProducts from "@/components/featured-products-section/server-featured-products";
import Features from "@/components/features-section";
import HeroSection from "@/components/hero-section";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-10 relative">
        <AgeVerify />
        <HeroSection />
        <BestSelling />
        <Features />
        {/* <FeaturedProducts /> */}
        <ServerFeaturedProducts />
        <FeaturedBrands />
      </div>
    </>
  );
}
