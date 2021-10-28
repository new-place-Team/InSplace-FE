/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

export const Slick = props => {
  const { children } = props;
  const settings = {
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };

  return (
    <Wrap>
      <StyledSlider>
        <Slider {...settings}>{children}</Slider>
      </StyledSlider>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    width: 100%;
    padding: 0 !important;
  }
  /* .slick-initialized, */
  .slick-slide {
    width: 100%;
    padding: 0 !important;
    overflow: hidden;
  }
`;
