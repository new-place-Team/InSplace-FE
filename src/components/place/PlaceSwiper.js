/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import { noImgDetail } from '../../images/index';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

SwiperCore.use([Pagination]);

const PlaceSwiper = props => {
  const { list } = props;

  const pagination = {
    clickable: true, // 버튼 클릭 여부
    type: 'fraction', // 버튼 모양 결정 "bullets", "fraction"
    renderFraction(currentClass, totalClass) {
      return `<div class="pageWrap"><span class="${currentClass}"></span><span class="line">/</span><span class="${totalClass}"></span></div>`;
    },
  };
  const setting = {
    slidesPerView: 1,
    spaceBetween: 16,
    autoplay: {
      delay: 3000, // 시간 설정
      disableOnInteraction: false, // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
    },
  };

  return (
    <StyledSlider>
      <Swiper {...setting} pagination={pagination}>
        {list &&
          list.map(info => {
            return (
              <SwiperSlide key={`card_${info}`}>
                <EntireImage src={info} errImg={noImgDetail} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </StyledSlider>
  );
};

const StyledSlider = styled.div`
  .pageWrap {
    position: absolute;
    right: 24px;
    bottom: 54px;
    width: 59px;
    height: 30px;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 0.45);
    border-radius: 40px;
    span {
      font-size: 13px;
      color: #3e4042;
    }
    .line {
      margin: 0px 1px;
    }
  }
`;

const EntireImage = styled.div`
  position: relative;
  width: 100%;
  height: 504px;
  background-image: url('${props => props.src}'),
    url('${props => props.errImg}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export default PlaceSwiper;
