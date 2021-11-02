/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

export const Slick = props => {
  const { inSideLength, outSideLength, children } = props;

  // 768px ToShow : 3 , 375px toshow : 1
  const settings = {
    centerMode: true,
    infinite: false,
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: '60px',
    responsive: [
      {
        breakpoint: 320,
        settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false },
      },
    ],
  };

  return (
    <Wrap>
      {outSideLength || inSideLength ? (
        <OneImageSlider>
          <Slider {...settings}>{children}</Slider>
        </OneImageSlider>
      ) : (
        <StyledSlider>
          <Slider {...settings}>{children}</Slider>
        </StyledSlider>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-slider .slick-list {
    width: 100% !important;
    padding: 0 !important;
    overflow: hidden;
  }
  .slick-track {
    display: flex;
    position: relative;
  }
  /* .slick-initialized, */
  .slick-slide {
    width: 100%;
    padding: 0 !important;
    margin-right: 14px;
    overflow: hidden;
  }
`;

const OneImageSlider = styled(Slider)`
  .slick-list .slick-track {
    width: 100% !important;
  }
`;
