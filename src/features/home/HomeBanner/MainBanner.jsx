import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Virtual } from 'swiper/modules';
import {
  imgbanner1, imgbanner2, imgbanner3,
  imgbanner4, imgbanner5, imgbanner6,
  imgbanner7, imgbanner8
} from '@/assets/image/ExportImage.jsx'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const MainBanner = () => {
  const dataImage = [
    { id: 1, image: imgbanner1 },
    { id: 2, image: imgbanner2 },
    { id: 3, image: imgbanner3 },
    { id: 4, image: imgbanner4 },
    { id: 5, image: imgbanner5 },
    { id: 6, image: imgbanner6 },
    { id: 7, image: imgbanner7 },
    { id: 8, image: imgbanner8 },
  ]
  return (
    <div className='w-screen'>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        threshold={0}
        speed={500}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {
          dataImage.map(item => (
            <SwiperSlide key={item.id}>
              <a href=''>
                <img src={item.image} alt="" />
              </a>
            </SwiperSlide>

          ))
        }
      </Swiper>
    </div>
  )
}

export default MainBanner