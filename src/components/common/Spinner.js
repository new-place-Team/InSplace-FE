import React from 'react';
import styled from 'styled-components';
import { spinner } from '../../images/index';

const Spinner = () => {
  return (
    <Outter>
      <Icon src={spinner} />
    </Outter>
  );
};

const Outter = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 100vw;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 100px;
`;

export default Spinner;
