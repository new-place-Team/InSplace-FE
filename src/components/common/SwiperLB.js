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
    spaceBetween: 50,
    slidesPerView: 3,
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      '@640': {
        slidesPerView: 5,
        spaceBetween: 50,
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
