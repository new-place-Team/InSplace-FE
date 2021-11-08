/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Icons = props => {
  const { width, height, margin, children } = props;

  const styles = {
    width,
    height,
    margin,
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
    width: 31px;
    height: 31px;
  }
`;

export default Icons;
