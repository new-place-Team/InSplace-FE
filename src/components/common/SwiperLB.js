/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import ListCard from '../place/ListCard';

const SwiperLB = props => {
  const { list } = props;
  const setting = {
    slidesPerView: 3,
    spaceBetween: 16,
    breakpoints: {
      // mobile
      320: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  };
  return (
    <Swiper {...setting}>
      {list &&
        list.map(info => {
          return (
            <SwiperSlide key={`card_${info.post_id}`}>
              <ListCard src={info.post_images} type="main" info={info} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
export default SwiperLB;
