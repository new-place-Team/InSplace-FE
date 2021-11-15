/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { history } from '../../redux/configureStore';
import { Grid } from '../../elements/index';
import theme from '../../styles/theme';
/* weather Icon */
import { ReactComponent as SunIcon } from '../../images/weather/sun-nav.svg';
import { ReactComponent as CloudIcon } from '../../images/weather/cloud.svg';
import { ReactComponent as RainIcon } from '../../images/weather/rain.svg';
import { ReactComponent as SnowIcon } from '../../images/weather/snow.svg';
/* Nav Icon */
import { ReactComponent as HomeIcon } from '../../images/nav/ic_nav_home.svg';
import { ReactComponent as FilterIcon } from '../../images/nav/ic_nav_fliter.svg';
import { ReactComponent as HeartIcon } from '../../images/nav/ic_nav_heart.svg';
import { ReactComponent as MypageIcon } from '../../images/nav/ic_nav_mypage.svg';
import { profile1 } from '../../images/index';
import { isLoginChk } from '../../shared/utils';

const Navbar = () => {
  const pathName = history.location.pathname;
  const isLogin = useSelector(state => state.user.isLogin);
  const userInfo = useSelector(state => state.user.userInfo);
  const weatherStatus = useSelector(state => state.place.weatherStatus);

  /* 로그인 필요 확인 */
  const pageMove = url => {
    if (!isLoginChk(isLogin)) {
      return;
    }
    history.push(url);
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
            justifyContent="center"
            width="100%"
          >
            <Icon color="#fff">{WeatherIcon}</Icon>
          </Grid>

          <Icon
            color={pathName === '/' ? '#000' : ''}
            onClick={() => history.push('/')}
          >
            <HomeIcon />
          </Icon>

          <Icon
            color={pathName === '/select-type' ? '#000' : ''}
            onClick={() => history.push('/select-type')}
          >
            <FilterIcon />
          </Icon>
          <Icon
            color={pathName === '/pickList' ? '#000' : ''}
            onClick={() => pageMove('/pickList')}
          >
            <HeartIcon />
          </Icon>
          {isLogin === false ? (
            <Icon
              color={pathName === '/mypage' ? '#000' : ''}
              onClick={() => pageMove('/mypage')}
            >
              <MypageIcon />
            </Icon>
          ) : // 로그인 상태일때
          userInfo.userImage === null ? (
            <UserImage
              width="24px"
              src={profile1}
              onClick={() => pageMove('/mypage')}
            />
          ) : (
            <UserImage
              width="24px"
              src={userInfo.userImage}
              onClick={() => pageMove('/mypage')}
            />
          )}
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
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: ${({ color }) => color || '#A4A9B1'};
    margin-bottom: 7px;
  }
`;

const UserImage = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-bottom: 8px;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

export default Navbar;
