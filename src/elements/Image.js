/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Image = props => {
  const { type, width, height, margin, src } = props;

  const styles = {
    width,
    height,
    margin,
    src,
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
    <>
      <DefaultImage src={src} />
    </>
  );
};

Image.defaultProps = {
  width: 'auto',
  height: 'auto',
  type: false,
  margin: false,
  src: 'https://i.pinimg.com/originals/1e/36/6e/1e366e54a8a8a8769f950ca2dad6ff60.png',
};

// 기본 사각 이미지들
const DefaultImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
