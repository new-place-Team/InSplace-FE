/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Icons = props => {
  const { width, height, margin, color, children, size } = props;

  const styles = {
    width,
    height,
    margin,
    color,
    size,
  };

  return <IconArea {...styles}>{children}</IconArea>;
};

Icons.defaultPorps = {
  width: '24px',
  height: '24px',
};

const IconArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${({ margin }) => margin || 0};
  cursor: pointer;
  svg {
    width: ${({ width }) => width || '24px'};
    height: ${({ height }) => height || '24px'};
    fill: ${({ color }) => color || ''};
    font-size: ${({ size }) => size || ''};
  }
`;

export default Icons;
