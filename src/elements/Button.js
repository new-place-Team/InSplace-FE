/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Button = props => {
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
    focus,
    _onClick,
    children,
  } = props;

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
    focus,
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
  focus: false,
  bg: 'transparent',
  border: 'none',
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
  margin: ${props => props.margin};
`;
const TypeButton = styled.button`
  width: ${props => (props.width ? props.width : 'auto')};
  margin: ${props => props.margin};
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  color: ${props => (props.color ? props.color : '#646464')};
  background-color: ${props => (props.bg ? props.bg : `#fff`)};
  border: 1px solid #646464;
  &:focus {
    color: #fff;
    background-color: #838383;
    border: 1px solid #838383;
  }
`;
// Text가 들어간 tag 버튼
const TagButton = styled.button`
  padding: 6px 16px;
  margin-right: 8px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ color }) => color || '#646464'};
  background-color: ${({ bg }) => bg || ' #f0f0f0'};
  border: ${props => (props.border ? props.border : 'none')};
  &:last-child {
    margin-right: 0;
  }
`;
// 정사각형 이동 버튼
const RecButton = styled.button`
  width: 85px;
  height: 85px;
  color: ${theme.color.white};
  background-color: ${theme.color.mainColor};
`;

export default Button;
