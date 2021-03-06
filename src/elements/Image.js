import React, { forwardRef, memo } from 'react';
import styled from 'styled-components';
import { insplace, noImgMap, noImgDetail } from '../images/index';

const Image = forwardRef((props, ref) => {
  const {
    type,
    width,
    height,
    margin,
    padding,
    color,
    src,
    children,
    _onClick,
  } = props;

  const styles = {
    width,
    height,
    margin,
    padding,
    src,
    color,
  };

  /* 이미지 ErrorHandle */
  const handleImgError = e => {
    if (type === 'map') {
      e.target.src = noImgMap;
    }
  };

  if (type === 'circle') {
    return (
      <>
        <ProfileImage {...styles} onClick={_onClick} />
      </>
    );
  }

  if (type === 'bg') {
    return (
      <>
        <BgImage {...styles} onClick={_onClick} errImg={noImgDetail}>
          {children}
        </BgImage>
      </>
    );
  }

  return (
    <DefaultGrid {...styles}>
      <DefaultImage {...styles} ref={ref} onError={handleImgError} />
    </DefaultGrid>
  );
});

Image.defaultProps = {
  width: 'auto',
  height: 'auto',
  type: false,
  margin: false,
  padding: false,
  src: insplace,
  _onChange: () => {},
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
  background-image: url('${props => props.src}'),
    url('${props => props.errImg}');
  background-size: cover;
  background-position: center;
  ${props => (props.margin ? `margin:${props.margin}` : '')};
  ${props => (props.padding ? `padding:${props.padding}` : '')};
  display: block;
  position: relative;
  @media (min-width: 768px) {
    background-size: cover;
    background-position: top;
  }
`;

// 프로필 이미지 (원형)
const ProfileImage = styled.div`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 50%;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  cursor: pointer;
  ${props => (props.margin ? `margin:${props.margin}` : '')};
  display: inline-block;
  @media (max-width: 1024px) {
    width: 169px;
    height: 169px;
  }
  @media (max-width: 768px) {
    width: 110px;
    height: 110px;
  }
`;

export default memo(Image);
