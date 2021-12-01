import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styled from 'styled-components';
import ListCard from '../place/ListCard';

const SwiperLB = props => {
  const { type, list } = props;
  const setting = {
    slidesPerView: 3,
    spaceBetween: 16,
    navigation: true,
    breakpoints: {
      // mobile
      320: {
        slidesPerView: 1,
        spaceBetween: -45,
      },
      360: {
        slidesPerView: 1,
        spaceBetween: -85,
      },
      375: {
        slidesPerView: 1,
        spaceBetween: -100,
      },
      410: {
        slidesPerView: 1,
        spaceBetween: -135,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: -9,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
  };
  if (type === 'selectResult') {
    return (
      <SwiperWrap>
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
      </SwiperWrap>
    );
  }

  return (
    <SwiperWrap>
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
    </SwiperWrap>
  );
};

const SwiperWrap = styled.div`
  .swiper-button-prev,
  .swiper-button-next {
    top: 40%;
    color: #fff;
  }
  .swiper-button-prev:after,
  .swiper-container-rtl .swiper-button-next:after,
  .swiper-button-next:after,
  .swiper-container-rtl .swiper-button-prev:after {
    font-size: 2rem;
  }
`;
export default SwiperLB;
