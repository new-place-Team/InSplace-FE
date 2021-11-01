/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Text = props => {
  const {
    fontSize,
    bold,
    color,
    others,
    children,
    margin,
    textAlign,
    lineHeight,
    border,
  } = props;

  const styles = {
    fontSize,
    bold,
    color,
    others,
    margin,
    textAlign,
    border,
    lineHeight,
  };

  return (
    <>
      <ElText {...styles}>{children}</ElText>
    </>
  );
};

Text.defaultProps = {
  fontSize: `${theme.fontSize.normal}`,
  bold: false,
  color: `${theme.color.mainColor}`,
  children: 'child',
  others: '',
  margin: null,
  textAlign: false,
  border: false,
  lineHeight: '1.5',
};

const ElText = styled.div`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.bold};
  color: ${props => props.color};
  font-weight: ${props =>
    props.bold
      ? `${theme.fontWeight.extraBold}`
      : `${theme.fontWeight.regular}`};
  ${props => props.textAlign && `text-align: ${props.textAlign}`};
  ${props => props.others};
  ${props => (props.margin ? `margin: ${props.margin}` : '')};
  ${props => (props.border ? `border-bottom: ${props.border}` : '')};
  line-height: ${({ lineHeight }) => lineHeight || '1.5'};
`;

export default Text;
