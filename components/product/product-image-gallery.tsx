"use client";

import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductType } from "@/types/api/product";

import Img from "../ui/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductImageGalleryProps {
  product: ProductType;
}

const ProductImageGallery = (props: ProductImageGalleryProps) => {
  const {
    product: { images },
  } = props;

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!images) return null;

  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-gallery-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Img
              src={image.url ? image.url : ""}
              alt={props.product.name}
              className="w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => {
          setThumbsSwiper(swiper);
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-gallery-swiper-thumbs"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Img
              src={image.url ? image.url : ""}
              alt={props.product.name}
              className="w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageGallery;
