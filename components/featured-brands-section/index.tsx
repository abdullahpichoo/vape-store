"use client";

import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Heading from "../ui/heading";
import Img from "../ui/image";

import "swiper/css";
import "swiper/css/autoplay";

const brands = [
  {
    name: "Vaporesso",
    logo: "/assets/brand-logos/vaporesso.jpg",
  },
  {
    name: "Vaporesso",
    logo: "/assets/brand-logos/vaporesso.jpg",
  },
  {
    name: "Vaporesso",
    logo: "/assets/brand-logos/vaporesso.jpg",
  },
  {
    name: "Vaporesso",
    logo: "/assets/brand-logos/vaporesso.jpg",
  },
  {
    name: "Vaporesso",
    logo: "/assets/brand-logos/vaporesso.jpg",
  },
  {
    name: "Vaporesso",
    logo: "/assets/brand-logos/vaporesso.jpg",
  },
];
const FeaturedBrands = () => {
  return (
    <section>
      <div className="heading-section flex flex-col gap-0">
        <h3 className="-mb-5 font-hind font-semibold text-gray-600">
          {"The Best Names in Vape Culture"}
        </h3>
        <Heading size="xl">Featured Brands</Heading>
      </div>
      <div className="brands bg-orange-1 -mx-5 sm:-mx-24 md:-mx-36 xl:-mx-[30rem] px-5 sm:px-24 md:px-36 py-8">
        <Swiper
          modules={[Navigation, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={2}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
          {brands.map((brand, i) => (
            <SwiperSlide key={i}>
              <Img src={brand.logo} alt={brand.name} className="w-72" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedBrands;
