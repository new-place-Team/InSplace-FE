/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';

const Text = props => {
  const { fontSize, bold, color, others, children, margin, textAlign } = props;
  const styles = {
    fontSize,
    bold,
    color,
    others,
    margin,
    textAlign,
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
`;

export default Text;
