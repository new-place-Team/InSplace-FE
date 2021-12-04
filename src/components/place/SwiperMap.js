/* eslint-disable no-undef */
import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, History } from 'swiper';
import styled from 'styled-components';
import MapCard from '../map/MapCard';

SwiperCore.use([Navigation, Pagination, History]);

const SwiperMap = React.memo(props => {
  const { list, _onChageFocus, focusId, padding } = props;
  const focusRef = useRef(null);
  let perViewCnt = 2;
  let loopYn = true;

  if (list && list.length < 2) {
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
    <Wrap padding={padding}>
      <Swiper
        className={perViewCnt === 1 ? 'mapSwiper mapSwiperFull' : 'mapSwiper'}
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
  bottom: 50px;
  left: 50%;
  padding-left: 40px;
  padding: ${({ padding }) => padding || '40px'};
  transform: translateX(-50%);
  z-index: 9;
  @media (max-width: 415px) {
    padding: ${({ padding }) => padding || '24px'};
  }
  .mapSwiper {
    .swiper-slide {
    }
    p {
      position: absolute;
      bottom: 0;
      font-size: 13px;
    }
    .swiper-slide-active {
      width: 80% !important;
    }
  }
  // swiper의 pagination 화면에 안보이게 숨기기
  .swiper-pagination-bullets {
    display: none;
    position: absolute;
    left: -999;
    width: 1px;
    height: 1px;
  }
  .mapSwiperFull .swiper-slide-active {
    width: 90% !important;
  }
`;

export default SwiperMap;
