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
      <DefaultImage {...styles} />
    </>
  );
};

Image.defaultProps = {
  type: false,
  margin: false,
  src: 'https://tistory4.daumcdn.net/tistory/4367973/attach/059c57a4a960451fad4115308781a782',
  height: '',
};

// 기본 사각 이미지들
const DefaultImage = styled.image`
  width: ${props => props.width};
  height: ${props => props.height};
  ${props => (props.margin ? `margin:${props.margin}` : '')};
  display: block;
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
