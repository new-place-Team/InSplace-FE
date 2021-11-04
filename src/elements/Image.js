/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { insplace } from '../images/index';

const Image = props => {
  const { type, width, height, margin, color, src } = props;

  const styles = {
    width,
    height,
    margin,
    src,
    color,
  };

  if (type === 'circle') {
    return (
      <>
        <ProfileImage {...styles} />
      </>
    );
  }

  if (type === 'bg') {
    return (
      <>
        <BgImage {...styles} />
      </>
    );
  }

  return (
    <DefaultGrid {...styles}>
      <DefaultImage {...styles} />
    </DefaultGrid>
  );
};

Image.defaultProps = {
  width: 'auto',
  height: 'auto',
  type: false,
  margin: false,
  src: insplace,
};

// 기본 사각 이미지들
const DefaultGrid = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin || '0'};
`;
const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${props => props.margin && `margin:${props.margin}`};
  src: ${props => props.src};
  ${props => (props.color ? `color:${props.color}` : '')};
`;

// background Image
const BgImage = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  ${props => (props.margin ? `margin:${props.margin}` : '')};
  display: block;
`;

// 프로필 이미지 (원형)
const ProfileImage = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.width};
  border-radius: 50%;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  ${props => (props.margin ? `margin:${props.margin}` : '')};
  display: block;
`;

export default Image;
