/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = props => {
  const { children, padding, height } = props;
  const styles = {
    height,
    padding,
  };
  return <ContainerWrap {...styles}>{children}</ContainerWrap>;
};

Container.defaultProps = {
  padding: '0 24px',
  height: '100vh',
};

const ContainerWrap = styled.div`
  position: relative;
  max-width: 768px;
  height: ${({ height }) => height};
  min-height: ${({ height }) => height || '100vh'};
  margin: 0 auto;
  padding: ${({ padding }) => padding || '0 24px'};
`;

export default Container;
