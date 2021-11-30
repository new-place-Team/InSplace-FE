/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { history } from '../redux/configureStore';
import { Container, Grid, Text } from '../elements';
import { getMainListDB } from '../redux/async/place';
import { ReactComponent as Right } from '../images/ic-next.svg';
import { ReactComponent as ArrowOut } from '../images/weather/ic_arrowsout.svg';
import Swiper from '../components/common/SwiperLB';
import MainWeather from '../components/main/MainWeather';
import WeatherBox from '../components/main/WeatherBox';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import ContentsTitle from '../components/common/ContentsTitle';
import theme from '../styles/theme';
import Banner from '../components/common/Banner';

const Main = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const mainLists = useSelector(state => state.place.mainLists);
  const [imgLoading, setImgLoading] = useState(false);
  const [onTop, setOnTop] = useState(true);
  const imgRef = useRef(null);
  /* 현재 날씨에 따른 배경 색상 */
  const getBg = info => {
    const status = info.frontWeather;
    let weatherKey = '';
    switch (status) {
      case 1:
        weatherKey = 'sun';
        break;
      case 2:
        weatherKey = 'rain';
        break;
      case 3:
        weatherKey = 'snow';
        break;
      default:
        weatherKey = 'cloud';
    }
    return theme.weatherBgColor[weatherKey];
  };

  const handleScroll = () => {
    if (window.scrollY > 66) {
      setOnTop(false);
    } else {
      setOnTop(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    if (!mainLists) {
      dispatch(getMainListDB());
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setImgLoading(true);
        }
      });
    };
    const observer = new IntersectionObserver(callback, {
      threshold: 0,
    });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  return (
    <>
      <Container padding="0">
        <Header
          _onBg
          _content="InSplace"
          _search
          _language
          _color="#fff"
          _onTop={onTop}
          _main
        />
        <SkeletonGrid ref={imgRef}>
          {/* Weather Section */}
          <>
            <MainWeather
              weatherInfo={mainLists && mainLists.weather}
              imgLoading={imgLoading}
            />
            <WeatherBox info={mainLists && mainLists.weather} />
            {/* 장소 추천받기 */}
            <SelectTypeBtn onClick={() => history.push('/select-type')}>
              <Grid height="22px" margin="19px 0 0 18px">
                <Text fontSize="16px" color="#fff" bold>
                  {t('mainPage.recommend')}
                </Text>
              </Grid>
              <NextButton>
                <Right />
              </NextButton>
            </SelectTypeBtn>
          </>
          <ArrowOutArea>
            <ArrowOut />
          </ArrowOutArea>
        </SkeletonGrid>
        {/* Place Section */}
        <Grid>
          {/* 날씨에 따른 공간 */}
          <Grid padding="0 0 48px 24px" margin="21px 0 0 0">
            <ContentsTitle
              title={t(
                `mainPage.weatherInfo.${
                  mainLists && mainLists.weather.frontWeather - 1
                }`,
              )}
            />
            <Swiper list={mainLists && mainLists.weatherPlace} />
          </Grid>
          {/* 좋아요 순 추천 공간 */}
          <Grid
            padding="0 0 48px 24px"
            bg={mainLists ? getBg(mainLists.weather)[0] : ''}
          >
            <ContentsTitle title={t('mainPage.popularPlace')} />
            <Swiper list={mainLists && mainLists.likePlace} />
          </Grid>
          {/* 관리자 추천 공간 */}
          <Grid
            padding="0 0 48px 24px"
            // padding="0 0 112px 24px"
            bg={mainLists ? getBg(mainLists.weather)[1] : ''}
          >
            <ContentsTitle title={t('mainPage.adminPlace')} />
            <Swiper list={mainLists && mainLists.pickPlace} />
          </Grid>
        </Grid>
        <Banner />
        <BottomHeight />
      </Container>
      <Navbar />
    </>
  );
};

const SkeletonGrid = styled.div`
  position: relative;
  height: 672px;
  margin-top: -66px;
  @media (max-width: 414px) {
    height: 473px;
  }
`;

const SelectTypeBtn = styled.div`
  position: absolute;
  bottom: -35px;
  right: 0;
  width: 133px;
  height: 125px;
  background-color: #232323;
  cursor: pointer;
  z-index: 8;
`;

const NextButton = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
  svg {
    width: 50px;
    height: 50px;
    fill: #fff;
  }
`;
const BottomHeight = styled.div`
  height: 65px;
`;

const ArrowOutArea = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  cursor: pointer;
`;
export default Main;
