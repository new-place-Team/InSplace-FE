/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';
import { Image, Grid } from '../../elements/index';
import { home, vector, user, heartLine } from '../../images/index';
import { ReactComponent as Filter } from '../../images/ic-fliter.svg';
import { ReactComponent as SunIcon } from '../../images/weather/sun-nav.svg';

const Navbar = () => {
  return (
    <Nav>
      <Content>
        <Wrap>
          <Grid
            bg="#FEB544"
            width="75px"
            height="100%"
            isFlex
            justifyContent="center"
          >
            <Icon color="#fff">
              <SunIcon />
            </Icon>
          </Grid>
          <Icon onClick={() => history.push('/')}>
            <Image src={home} />
          </Icon>
          <Icon onClick={() => history.push('/select-type')}>
            <Filter />
          </Icon>
          <Icon onClick={() => window.alert('서비스 준비중 입니다.')}>
            <Image src={heartLine} />
          </Icon>
          <Icon onClick={() => history.push('/login')}>
            <Image src={user} />
          </Icon>
        </Wrap>
      </Content>
    </Nav>
  );
};

const Nav = styled.div`
  width: 100%;
  height: 65px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -2px 3px rgb(196 196 196 /25%);
  z-index: 3;
`;

const Content = styled.div`
  width: 100%;
  max-width: 768px;
  bottom: 0;
  height: 65px;
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
  height: 65px;
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  svg {
    fill: ${({ color }) => color || ''};
  }
`;

export default Navbar;
