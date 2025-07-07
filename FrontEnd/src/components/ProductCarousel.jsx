import React from "react";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./carousel.css";

function ProductCarousel({ products, goldPrice }) {
  
  const swiperKey = products.map((p) => p.name).join("-");

  return (
    <div className="carousel-wrapper position-relative">
      <div className="arrow-left" id="custom-prev"></div>
      <div className="arrow-right" id="custom-next"></div>

      <Swiper
        key={swiperKey}
        modules={[Navigation, Scrollbar]}
        navigation={{
          nextEl: "#custom-next",
          prevEl: "#custom-prev",
        }}
        scrollbar={{ draggable: true }}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        }}
        style={{ paddingBottom: "40px" }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.name}>
            <ProductCard product={product} goldPrice={goldPrice} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductCarousel;



