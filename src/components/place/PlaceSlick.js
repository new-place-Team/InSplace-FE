/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const PlaceSlick = props => {
  const { images, children } = props;
  const [state, setState] = useState(1);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 1000,
    cssEase: 'linear',
    beforeChange: current => {
      setState(current + 1);
    },
  };
  return (
    <>
      <Wrap>
        <Test>
          <Slider {...settings}>{children}</Slider>
        </Test>
        <DotteWrap>
          <Dotte>
            {state}/{images && images.length}
          </Dotte>
        </DotteWrap>
      </Wrap>
    </>
  );
};
const Wrap = styled.div`
  position: relative;
`;

const Test = styled(Slider)`
  .slick-list {
    width: 100%;
  }
`;

const DotteWrap = styled.div`
  position: absolute;
  bottom: 50px;
  right: 0;
`;
const Dotte = styled.div`
  width: 59px;
  height: 25px;
  line-height: 25px;
  font-size: 13px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 40px;
`;
