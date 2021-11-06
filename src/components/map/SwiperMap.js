/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import MapCard from './MapCard';

import { setFocusCoord } from '../../redux/modules/placeSlice';

const SwiperMap = props => {
  // 리스트는 받아온 데이터
  const dispatch = useDispatch();
  const { list } = props;
  const setting = {
    slidesPerView: 1,
    spaceBetween: -23,
    loop: true,
  };

  return (
    <Wrap>
      <Swiper
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

// console.log(
//   e.realIndex,
//   list[e.realIndex],
//   list[e.realIndex].postLocationY,
//   list[e.realIndex].postLocationX,
// )
