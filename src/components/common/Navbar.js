/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { history } from '../../redux/configureStore';
import { Image, Grid, Icons } from '../../elements/index';
import { home, user, heartLine } from '../../images/index';
import theme from '../../styles/theme';
import { ReactComponent as Filter } from '../../images/ic-fliter.svg';
import { ReactComponent as SunIcon } from '../../images/weather/sun-nav.svg';
import { ReactComponent as CloudIcon } from '../../images/weather/cloud.svg';
import { ReactComponent as RainIcon } from '../../images/weather/rain.svg';
import { ReactComponent as SnowIcon } from '../../images/weather/snow.svg';

const Navbar = () => {
  const isLogin = useSelector(state => state.user.isLogin);
  const weatherStatus = useSelector(state => state.place.weatherStatus);
  // 로그인 했으면 마이페이지, 로그인 안했으면 로그인 페이지
  const pageMove = () => {
    if (isLogin === false) {
      history.push('/login');
    } else {
      history.push('/mypage');
    }
  };
  let WeatherIcon = '';
  let weatherKey = '';
  if (weatherStatus) {
    const status = weatherStatus.frontWeather;
    if (status === 2) {
      WeatherIcon = <RainIcon />;
      weatherKey = 'rain';
    } else if (status === 3) {
      WeatherIcon = <SnowIcon />;
      weatherKey = 'snow';
    } else if (status === 4) {
      WeatherIcon = <CloudIcon />;
      weatherKey = 'cloud';
    } else {
      WeatherIcon = <SunIcon />;
      weatherKey = 'sun';
    }
  }
  return (
    <Nav>
      <Content>
        <Wrap>
          <Grid
            bg={theme.weatherColor[weatherKey]}
            width="75px"
            height="100%"
            isFlex
            justifyContent="center"
          >
            <Icon color="#fff">{WeatherIcon}</Icon>
          </Grid>
          <Icon onClick={() => history.push('/')}>
            <Image src={home} />
          </Icon>
          <Icon onClick={() => history.push('/select-type')}>
            <Filter />
          </Icon>
          <Icon onClick={() => history.push('/pickList')}>
            <Image src={heartLine} />
          </Icon>
          <Icon onClick={pageMove}>
            {/* <Icon onClick={() => history.push('/login')}> */}
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
