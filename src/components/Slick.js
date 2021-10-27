/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Slick = props => {
  const { children } = props;
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 1,
    speed: 500,
  };
  return <Slider {...settings}>{children}</Slider>;
};
