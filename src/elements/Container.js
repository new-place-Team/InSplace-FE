/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = props => {
  const { children } = props;
  return (
    <ContainerWrap>
      <Wrap>{children}</Wrap>
    </ContainerWrap>
  );
};

const ContainerWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  width: 375px;
  height: 100vh;
  padding: 0 24px;
  border: 1px solid #f4f4f4;
`;

export default Container;
