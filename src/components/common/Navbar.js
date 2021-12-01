/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../redux/configureStore';
import { Grid } from '../../elements/index';
import { setCategoryInit } from '../../redux/modules/placeSlice';
import theme from '../../styles/theme';

/* Nav Icon */
import { ReactComponent as HomeIcon } from '../../images/nav/ic_nav_home.svg';
import { ReactComponent as NavMap } from '../../images/nav/ic_nav_map.svg';
import { ReactComponent as NavMapFill } from '../../images/nav/ic_nav_map-filled.svg';
import { ReactComponent as FilterIcon } from '../../images/nav/ic_nav_fliter.svg';
import { ReactComponent as HeartIcon } from '../../images/nav/ic_nav_heart.svg';
import { ReactComponent as MypageIcon } from '../../images/nav/ic_nav_mypage.svg';
import ConfirmModal from './ConfirmModal';

const Navbar = () => {
  const dispatch = useDispatch();
  const pathName = history.location.pathname;
  const { t } = useTranslation();
  const isLogin = useSelector(state => state.user.isLogin);
  const userInfo = useSelector(state => state.user.userInfo);
  const weatherStatus = useSelector(state => state.place.weatherStatus);
  const [confirmModal, setConfirmModal] = useState(false);

  let weatherKey = '';
  if (weatherStatus) {
    const status = weatherStatus.frontWeather;
    if (status === 2) {
      weatherKey = 'rain';
    } else if (status === 3) {
      weatherKey = 'snow';
    } else if (status === 4) {
      weatherKey = 'cloud';
    } else {
      weatherKey = 'sun';
    }
  }

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
  };

  /* 장소 검색 카테고리 */
  const goPlaceSearch = () => {
    dispatch(setCategoryInit());
    history.push('/select-type');
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
      <Nav>
        <Content>
          <Wrap>
            <Grid
              bg={pathName === '/' ? theme.weatherColor[weatherKey] : ''}
              justifyContent="center"
              width="100%"
            >
              <Icon
                color={pathName === '/' ? '#fff' : ''}
                onClick={() => history.push('/')}
              >
                <HomeIcon />
              </Icon>
            </Grid>
            <Icon onClick={() => history.push('/location')}>
              {pathName === '/location' ? <NavMapFill /> : <NavMap />}
            </Icon>

            <Icon
              color={pathName === '/select-type' ? '#000' : ''}
              onClick={goPlaceSearch}
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
            {isLogin === false || userInfo === {} ? (
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
