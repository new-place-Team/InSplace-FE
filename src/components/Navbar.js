import React from 'react';
import styled from 'styled-components';
import { Grid, Image } from '../elements/index';
import { home, vector, sliders, user, heart } from '../images/index';

const Navbar = () => {
  return (
    <Nav>
      <Wrap>
        <Icon>
          <Image src={vector} />
        </Icon>
        <Icon>
          <Image src={home} />
        </Icon>
        <Icon>
          <Image src={sliders} />
        </Icon>
        <Icon>
          <Image src={heart} />
        </Icon>
        <Icon>
          <Image src={user} />
        </Icon>
      </Wrap>
    </Nav>
  );
};

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: #fff;
`;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  width: 375px;
  height: 52px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
`;

export default Navbar;
