/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { history } from '../../redux/configureStore';
import { Grid } from '../../elements/index';
import theme from '../../styles/theme';
import WeatherDetail from './WeatherDetail';
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

// import { isLoginChk } from '../../shared/utils';
import ConfirmModal from './ConfirmModal';

const Navbar = () => {
  const pathName = history.location.pathname;
  const { t } = useTranslation();
  const isLogin = useSelector(state => state.user.isLogin);
  const userInfo = useSelector(state => state.user.userInfo);
  const weatherStatus = useSelector(state => state.place.weatherStatus);
  const [weatherModalShow, setWeatherModalShow] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

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
  const openWeatherModal = () => {
    setWeatherModalShow(true);
  };

  const closeWeatherModal = () => {
    setWeatherModalShow(false);
  };

  const pageMove = value => {
    if (value === undefined && !isLogin) {
      history.push(`/login`);
    } else {
      history.push(`${value}`);
    }
  };
  /* 로그인 필요 확인 */
  const loginCheck = url => {
    if (!isLogin) {
      setConfirmModal(true);
      return;
    }
    pageMove(url);
    // if (!isLoginChk(isLogin)) {
    //   return;
    // }
    // history.push(url);
  };

  return (
    <>
      {confirmModal && (
        <ConfirmModal
          title={t('Navbar.login')}
          setConfirmModal={setConfirmModal}
          goToLogin
        />
      )}
      {weatherModalShow && (
        <WeatherDetail closeWeatherModal={closeWeatherModal} />
      )}
      <Nav>
        <Content>
          <Wrap>
            <Grid
              bg={theme.weatherColor[weatherKey]}
              justifyContent="center"
              width="100%"
              _onClick={openWeatherModal}
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
              onClick={() => loginCheck('/pickList')}
            >
              <HeartIcon />
            </Icon>
            {/* 로그인 안 상태일때 */}
            {isLogin === false || !userInfo ? (
              <Icon
                color={pathName === '/mypage' ? '#000' : ''}
                onClick={() => loginCheck('/mypage')}
              >
                <MypageIcon />
              </Icon>
            ) : (
              <UserImage
                width="24px"
                src={userInfo && userInfo.userImage}
                onClick={() => loginCheck('/mypage')}
              />
            )}
          </Wrap>
        </Content>
      </Nav>
    </>
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
  z-index: 9;
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
