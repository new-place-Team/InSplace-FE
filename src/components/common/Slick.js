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
    // centerMode: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    // responsive: [
    //   {
    //     breakpoint: 320,
    //     settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false },
    //   },
    //   {
    //     breakpoint: 360,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       infinite: false,
    //       centerPadding: '40px',
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: false,
    //       centerPadding: '30px',
    //     },
    //   },
    //   {
    //     breakpoint: 1024,
    //     settings: { slidesToShow: 3, slidesToScroll: 3, infinite: false },
    //   },
    // ],
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
    padding: 0 0 0 20px;
  }
`;

const OneImageSlider = styled(Slider)`
  .slick-list .slick-track {
    width: 100% !important;
  }
`;
