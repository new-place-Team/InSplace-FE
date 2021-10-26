/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Button = props => {
  // props로 전달받을 값들
  const { type, margin, padding, border, color, bg, _onClick, children } =
    props;
  // props 중에서 style 속성들
  const styles = {
    margin,
    padding,
    border,
    color,
    bg,
  };

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
  type: false,
  margin: false,
  padding: '5rem',
  bg: theme.color.mainColor,
  color: theme.color.white,
  _onClick: () => {},
};

// 기본 width 100% 버튼
const DefaultButton = styled.button`
  width: 100%;
  height: 52px;
  box-sizing: border-box;
  ${props => (props.margin ? `margin:${props.margin}` : '')};
  ${props => (props.border ? `border:${props.border}` : '')};

  background-color: ${props => props.bg};
`;
// Text가 들어간 tag 버튼
const TagButton = styled.button`
  padding: 12px 20px;
  box-sizing: border-box;
  ${props => (props.bg ? `background-color:${props.bg}` : '')};
`;
// 정사각형 이동 버튼
const RecButton = styled.button`
  width: 85px;
  height: 85px;
  box-sizing: border-box;
`;

export default Button;
