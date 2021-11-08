/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, History } from 'swiper';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import MapCard from './MapCard';
import { setFocusCoord } from '../../redux/modules/placeSlice';

SwiperCore.use([Navigation, Pagination, History]);

const SwiperMap = props => {
  // SwiperCore.use([Pagination]);
  const dispatch = useDispatch();
  const { list } = props;
  const setting = {
    slidesPerView: 1,
    spaceBetween: -23,
    loop: true,
    breakpoints: {
      // mobile
      500: {
        slidesPerView: 12,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
    },
  };

  return (
    <Wrap>
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        /* 스와이프 했을떄 실행할 함수 */
        onSlideChange={e => {
          const coord = {
            lat: list[e.realIndex].postLocationY,
            lon: list[e.realIndex].postLocationX,
          };

          dispatch(setFocusCoord(coord));
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
  z-index: 99;
`;
export default SwiperMap;
