/* eslint-disable no-undef */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, History } from 'swiper';
import styled from 'styled-components';
import MapCard from './MapCard';

SwiperCore.use([Navigation, Pagination, History]);

const SwiperMap = props => {
  const { list, _onChageFocus } = props;

  const setting = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    // breakpoints: {
    //   320: {
    //     slidesPerView: 1,
    //     spaceBetween: 16,
    //   },
    //   500: {
    //     slidesPerView: 3,
    //     spaceBetween: 50,
    //   },
    // },
  };

  return (
    <Wrap>
      <Swiper
        className="mapSwiper"
        /* 스와이프 했을떄 실행할 함수 */
        onSlideChange={e => {
          const coord = {
            lat: list[e.realIndex].postLocationY,
            lon: list[e.realIndex].postLocationX,
          };
          _onChageFocus(coord);
          // dispatch(setFocusCoord(coord));
        }}
        {...setting}
      >
        {list &&
          list.map(el => {
            return (
              <SwiperSlide key={el.postId}>
                <MapCard el={el} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  background-color: transparent;
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;

  .mapSwiper {
    .swiper-slide {
    }
    h3 {
      height: 23px;
      overflow: hidden;
    }
    p {
      height: 34px;
      overflow: hidden;
    }
    .swiper-slide-active {
      width: 55% !important;
      h3,
      p {
        overflow: visible;
        height: auto;
      }
    }
  }
`;

export default SwiperMap;
