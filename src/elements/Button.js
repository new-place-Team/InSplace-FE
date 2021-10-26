/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Button = props => {
  // props로 전달받을 값들
  const {
    type,
    width,
    margin,
    padding,
    border,
    radius,
    color,
    size,
    bold,
    bg,
    _onClick,
    children,
  } = props;
  // props 중에서 style 속성들
  const styles = {
    width,
    margin,
    padding,
    border,
    radius,
    color,
    size,
    bold,
    bg,
  };

  if (type === 'fullSizeBlack') {
    return (
      <>
        <FullSizeBlack {...styles} onClick={_onClick}>
          {children}
        </FullSizeBlack>
      </>
    );
  }

  if (type === 'fullSizeWhite') {
    return (
      <>
        <FullSizeWhite {...styles} onClick={_onClick}>
          {children}
        </FullSizeWhite>
      </>
    );
  }
  if (type === 'type') {
    return (
      <>
        <TypeButton {...styles} onClick={_onClick}>
          {children}
        </TypeButton>
      </>
    );
  }
  if (type === 'tag') {
    return (
      <>
        <TagButton {...styles} onClick={_onClick}>
          {children}
        </TagButton>
      </>
    );
  }

  if (type === 'rectangle') {
    return (
      <>
        <RecButton {...styles} onClick={_onClick}>
          {children}
        </RecButton>
      </>
    );
  }

  return (
    <>
      <DefaultButton {...styles} onClick={_onClick}>
        {children}
      </DefaultButton>
    </>
  );
};

Button.defaultProps = {
  width: 'auto',
  height: 'auto',
  margin: 0,
  padding: 0,
  radius: 0,
  size: '14px',
  bold: false,
  _onClick: () => {},
};

// 기본 타입의 button
const DefaultButton = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  font-size: ${props => props.size};
  ${props => (props.bold ? `font-weight:800` : '')};
  color: ${props => props.color};
  ${props => (props.radius ? `border-radius:${props.radius}` : '')};
  border: ${props => (props.border ? props.border : 'none')};
  background-color: ${props => props.bg};
`;
// 디자이너분들 시안 나오면 hover나 색상 확인 후 진행하기
const FullSizeBlack = styled.button`
  width: 100%;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
  background-color: ${theme.color.mainColor};
  color: ${theme.color.white};
  border: 1px solid ${theme.color.mainColor};
`;
// 디자이너분들 시안 나오면 hover나 색상 확인 후 진행하기
const FullSizeWhite = styled.button`
  width: 100%;
  height: 52px;
  line-height: 52px;
  font-size: 16px;
  background-color: ${theme.color.white};
  color: ${theme.color.mainColor};
  border: 1px solid ${theme.color.mainColor};
`;
const TypeButton = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${props => (props.color ? props.color : '#646464')};
  background-color: ${props => (props.bg ? props.bg : `#fff`)};
  border: ${props => (props.border ? props.border : '1px solid #646464')};
`;
// Text가 들어간 tag 버튼
const TagButton = styled.button`
  padding: 6px 16px;
  font-size: ${props => props.size};
  background-color: ${props => (props.bg ? props.bg : `#F0F0F0`)};
  border: ${props => (props.border ? props.border : 'none')};
`;
// 정사각형 이동 버튼
const RecButton = styled.button`
  width: 85px;
  height: 85px;
  color: ${theme.color.white};
  background-color: ${theme.color.mainColor};
`;

export default Button;
