/* eslint-disable no-undef */
import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, History } from 'swiper';
import styled from 'styled-components';
import MapCard from './MapCard';

SwiperCore.use([Navigation, Pagination, History]);

const SwiperMap = React.memo(props => {
  const { list, _onChageFocus, focusId } = props;
  const focusRef = useRef(null);
  let perViewCnt = 3;
  let loopYn = true;
  if (list.length < 3) {
    perViewCnt = list.lenght === 2 ? 2 : 1;
    loopYn = false;
  }
  const setting = {
    slidesPerView: perViewCnt,
    spaceBetween: 30,
    loop: loopYn,
    pagination: {
      clickable: true,
    },
  };
  useEffect(() => {
    if (list) {
      const findIdx = list.findIndex(v => v.postId === focusId);
      const postFocus = focusRef.current.swiper.pagination.bullets[findIdx];
      if (postFocus) {
        postFocus.click();
      }
    }
  }, [focusId]);

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
        }}
        {...setting}
        ref={focusRef}
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
});

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
