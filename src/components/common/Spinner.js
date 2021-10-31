import React from 'react';
import styled from 'styled-components';
import { share } from '../../images/index';

const Spinner = props => {
  return (
    <Outter>
      <Icon src={share} />
    </Outter>
  );
};

const Outter = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
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
  ${props => props.margin && `margin:${props.margin}`};
  vertical-align: text-bottom;
`;

export default Spinner;
