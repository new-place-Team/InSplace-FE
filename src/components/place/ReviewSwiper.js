/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

const ReviewSwiper = props => {
  const { list } = props;
  const setting = {
    slidesPerView: 3,
    spaceBetween: 12,
    autoplay: {
      delay: 3000, // 시간 설정
      disableOnInteraction: false,
    },
  };

  return (
    <StyledSlider>
      <Swiper {...setting}>
        {list &&
          list.map(info => {
            return (
              <SwiperSlide key={`review-${info}`}>
                <EntireImage src={info} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </StyledSlider>
  );
};

const StyledSlider = styled.div`
  .swiper-slide {
    width: 118px !important;
    height: 118px;
  }
`;

const EntireImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
export default ReviewSwiper;
