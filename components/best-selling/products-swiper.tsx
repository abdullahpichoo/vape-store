"use client";

import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useRef, useState } from "react";
import { Navigation, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperRef } from "swiper/react";

import { ProductCardType, ProductType } from "@/types/api/product";

import "swiper/css";
import "swiper/css/autoplay";

import ProductCard from "../ui/product-card";

interface ProductsSwiperProps {
  products: ProductType[];
}

const ProductsSwiper = (props: ProductsSwiperProps) => {
  const { products } = props;
  const swiperRef = useRef<SwiperRef>(null);
  const [currSlide, setCurrSlide] = useState(1);

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);

  return (
    <>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Scrollbar, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          520: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        onSlideChange={(swiper) =>
          setCurrSlide(
            swiper.activeIndex + 1 > products.length
              ? 1
              : swiper.activeIndex + 1
          )
        }
      >
        {products.map((product, i) => (
          <SwiperSlide key={i}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="navigation-btns text-[2rem] flex justify-center gap-3 my-5 items-center">
        <div
          className="prev cursor-pointer hover:scale-110 hover:text-orange-1"
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </div>
        <h6>
          {currSlide}/ {products.length}
        </h6>
        <div
          className="next cursor-pointer hover:scale-110 hover:text-orange-1"
          onClick={handleNext}
        >
          <FontAwesomeIcon icon={faArrowRightLong} />
        </div>
      </div>
    </>
  );
};

export default ProductsSwiper;
