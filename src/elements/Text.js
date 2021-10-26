/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Text = props => {
  const { fontSize, bold, center, color, others, children, margin } = props;
  const styles = {
    fontSize,
    bold,
    center,
    color,
    others,
    margin,
  };

  return (
    <>
      <ElText {...styles}>{children}</ElText>
    </>
  );
};

Text.defaultProps = {
  fontSize: '14px',
  bold: 400,
  center: '',
  color: 'black',
  children: 'child',
  others: '',
  margin: null,
};

const ElText = styled.div`
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.bold};
  color: ${props => props.color};
  ${props => (props.center ? `text-align: center` : '')};
  ${props => props.others};
  ${props => (props.margin ? `margin: ${props.margin}` : '')};
`;

export default Text;
