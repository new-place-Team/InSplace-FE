/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import ListCard from '../place/ListCard';

const SwiperLB = props => {
  const { type, list } = props;
  const setting = {
    slidesPerView: 3,
    spaceBetween: 16,
    breakpoints: {
      // mobile
      320: {
        slidesPerView: 1,
        spaceBetween: -95,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  };
  if (type === 'selectResult') {
    return (
      <Swiper {...setting}>
        {list &&
          list.map(info => {
            return (
              <SwiperSlide key={info.postId}>
                <ListCard type="selectResult" info={info} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    );
  }

  return (
    <Swiper {...setting}>
      {list &&
        list.map(info => {
          return (
            <SwiperSlide key={info.postId}>
              <ListCard src={info.postImages} type="main" info={info} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};
export default SwiperLB;
