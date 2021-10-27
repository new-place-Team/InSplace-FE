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
    // className: 'center',
    // centerMode: true,
    // infinite: false,
    // centerPadding: '10px',
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
  };

  return (
    <Test>
      <Slider {...settings}>{children}</Slider>
    </Test>
  );
};

const Test = styled.div`
  width: 345px;
  border: 1px solid black;
`;
