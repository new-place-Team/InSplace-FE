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
    infinite: false,
    slidesToShow: 3,
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
    padding: 0 0 0 20px;
  }
  @media only screen and (max-width: 500px) {
    .slick-slider {
      width: 100% !important;
    }
  }
`;

const OneImageSlider = styled(Slider)`
  .slick-list .slick-track {
    width: 100% !important;
  }
`;
