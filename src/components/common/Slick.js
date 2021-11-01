/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

export const Slick = props => {
  const { inSideLength, outSideLength, children } = props;

  const settings = {
    centerMode: true,
    centerPadding: '30px',
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
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
  /* .slick-initialized, */
  .slick-slide {
    width: 100%;
    padding: 0 !important;
    overflow: hidden;
  }
`;

const OneImageSlider = styled(Slider)`
  .slick-list .slick-track {
    width: 100% !important;
  }
`;
