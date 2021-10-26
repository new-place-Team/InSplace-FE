/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Image = props => {
  const { shape, width, height, margin, src } = props;

  const styles = {
    width,
    height,
    margin,
  };

  if (shape === 'circle') {
    return (
      <>
        <ProfileImage {...styles} />
      </>
    );
  }

  if (shape === 'rectangle') {
    return (
      <>
        <EntireImage {...styles} />
      </>
    );
  }

  return (
    <>
      <DefaultImage {...styles} src={src} />
    </>
  );
};

Image.defaultProps = {
  type: false,
  margin: false,
  src: 'https://tistory4.daumcdn.net/tistory/4367973/attach/059c57a4a960451fad4115308781a782',
};

// 기본 사각 이미지들
const DefaultImage = styled.image`
  width: ${props => props.width};
  height: ${props => props.width};
  ${props => (props.margin ? `margin:${props.margin}` : '')};
`;

// background Image 전체
const EntireImage = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  ${props => (props.margin ? `margin:${props.margin}` : '')};
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
`;

export default Image;
