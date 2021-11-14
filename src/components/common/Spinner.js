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
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.7);
`;

const Icon = styled.img`
  width: 100px;
`;

export default Spinner;
