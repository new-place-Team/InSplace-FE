/* eslint-disable */
/* eslint-disable react/prop-types */
/* eslint no-const-assign: "error" */

/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const MapSlick = props => {
  const { children } = props;
  // let index = 0;
  const container = useRef(null);
  const [number, setNumber] = useState(0);
  const settings = {
    centerMode: true,
    infinite: true, // 무한으로
    centerPadding: '38px',
    slidesToShow: 1, // 몇장씩 보여 줄건지?
    speed: 500,
    afterChange: () => {
      // if (number === children.length - 1) {
      //   setNumber(0);
      //   console.log(number);
      //   console.log(children[number]);
      // } else {
      //   setNumber(number + 1);
      //   console.log(number);
      //   console.log(children[number]);
      // }
      setNumber(number - 1);
      console.log(number);
    },
  };

  return (
    <>
      <Wrap>
        <StyledSlider>
          <Slider {...settings} ref={container}>
            {children}
          </Slider>
        </StyledSlider>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: transparent;
  position: absolute;
  bottom: 58px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    width: 100%;
    /* padding: 0 !important; */
  }
  /* .slick-initialized, */
  .slick-slide {
    width: 70%;
    /* padding: 0 !important; */
    /* overflow: hidden; */
  }
`;
