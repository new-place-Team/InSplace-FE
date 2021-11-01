import React from 'react';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';
import { Image } from '../../elements/index';
import { home, vector, sliders, user, heart } from '../../images/index';

const Navbar = () => {
  return (
    <Nav>
      <Content>
        <Wrap>
          <Icon onClick={() => history.push('/')}>
            <Image src={vector} />
          </Icon>
          <Icon onClick={() => history.push('/')}>
            <Image src={home} />
          </Icon>
          <Icon onClick={() => history.push('/select/type')}>
            <Image src={sliders} />
          </Icon>
          <Icon onClick={() => window.alert('서비스 준비중 입니다.')}>
            <Image src={heart} />
          </Icon>
          <Icon onClick={() => window.alert('서비스 준비중 입니다.')}>
            <Image src={user} />
          </Icon>
        </Wrap>
      </Content>
    </Nav>
  );
};

const Nav = styled.div`
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  background-color: royalblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 768px;
  bottom: 0;
  height: 80px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 80px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export default Navbar;
