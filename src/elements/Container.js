/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = props => {
  const { children, padding } = props;
  return (
    <ContainerWrap>
      <Wrap padding={padding}>{children}</Wrap>
    </ContainerWrap>
  );
};

Container.defaultProps = {
  padding: '0 24px',
};
const ContainerWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  width: 375px;
  height: 100vh;
  padding: ${props => props.padding};
  border: 1px solid #f4f4f4;
`;

export default Container;
