import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import {
  imgbrand1, imgbrand2, imgbrand3,
  imgbrand4, imgbrand5, imgbrand6,
  imgbrand7, imgbrand8
} from '@/assets/image/ExportImage.jsx'

import 'swiper/css';

const BrandBanner = () => {
  const dataImage = [
    { id: 1, image: imgbrand1 },
    { id: 2, image: imgbrand2 },
    { id: 3, image: imgbrand3 },
    { id: 4, image: imgbrand4 },
    { id: 5, image: imgbrand5 },
    { id: 6, image: imgbrand6 },
    { id: 7, image: imgbrand7 },
    { id: 8, image: imgbrand8 },
    { id: 9, image: imgbrand1 },
    { id: 10, image: imgbrand2 },
    { id: 11, image: imgbrand3 },
    { id: 12, image: imgbrand4 },
  ];

  const markVisibleSlides = (swiper) => {
    swiper.slides.forEach((slideEl) => {
      if (slideEl.classList.contains("swiper-slide-visible")) {
        const img = slideEl.querySelector("img");
        if (img && !img.classList.contains("show-brand-image")) {
          img.classList.add("show-brand-image"); // đánh dấu đã hiện lần đầu
        }
      }
    });
  };

  return (
    <div className='brand-banner w-screen container md:!py-[40px] !py-5 !px-[15px] mx-auto'>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={7}
        loop={false}
        watchSlidesProgress
        speed={3000}
        breakpoints={{
          320: { slidesPerView: 4 },
          1024: { slidesPerView: 7 }  // desktop

        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onInit={(swiper) => markVisibleSlides(swiper)}
        onTouchEnd={(swiper) => {
          markVisibleSlides(swiper)
        }}
        onAutoplay={(swiper) => markVisibleSlides(swiper)}
        onReachEnd={(swiper) => {
          swiper.autoplay.stop(); // 👈 dừng khi tới cuối
        }}
      >
        {dataImage.map(item => (
          <SwiperSlide className='' key={item.id}>
            <a className='md:h-[70px] h-[75px] w-[75px] block' href=''>
              <img
                src={item.image}
                alt=""
                className="h-full  duration-500"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default BrandBanner;
