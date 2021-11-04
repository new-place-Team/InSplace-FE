/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import MapCard from './MapCard';

const SwiperMap = props => {
  // 리스트는 받아온 데이터
  const { list } = props;
  console.log(list);
  const setting = {
    slidesPerView: 1,
    spaceBetween: -23,
    loop: true,
  };

  return (
    <Wrap>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        onSlideChange={e => console.log(e)}
        pagination={{ clickable: true }}
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
