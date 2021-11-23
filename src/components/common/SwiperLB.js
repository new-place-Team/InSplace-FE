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
        spaceBetween: type === 'selectResult' ? -45 : -45,
      },
      360: {
        slidesPerView: 1,
        spaceBetween: type === 'selectResult' ? -85 : -85,
      },
      375: {
        slidesPerView: 1,
        spaceBetween: type === 'selectResult' ? -100 : -100,
      },
      410: {
        slidesPerView: 1,
        spaceBetween: type === 'selectResult' ? -135 : -135,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: type === 'selectResult' ? -9 : -9,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: type === 'selectResult' ? 16 : 16,
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
                <ListCard
                  src={info.postImages}
                  type="selectResult"
                  info={info}
                />
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
