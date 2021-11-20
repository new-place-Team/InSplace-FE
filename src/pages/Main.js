/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import WeatherBox from '../components/main/WeatherBox';
import Header from '../components/common/Header';
import ContentsTitle from '../components/common/ContentsTitle';
import { Container, Grid, Text, Button } from '../elements';
import { getMainListDB } from '../redux/async/place';
import Navbar from '../components/common/Navbar';
import { ReactComponent as Marker } from '../images/ic-marker.svg';
import { ReactComponent as Right } from '../images/ic-next.svg';
import Swiper from '../components/common/SwiperLB';
import MainWeather from '../components/main/MainWeather';

const Main = () => {
  const dispatch = useDispatch();
  const mainLists = useSelector(state => state.place.mainLists);
  const location = useSelector(state => state.place.location);
  const likeList = mainLists && mainLists.likePlace;
  const pickList = mainLists && mainLists.pickPlace;
  const weatherList = mainLists && mainLists.weatherPlace;
  const weatherInfo = mainLists && mainLists.weather;
  const { t, i18n } = useTranslation();
  const korean = () => {
    i18n.changeLanguage('ko-KR');
  };
  const american = () => {
    i18n.changeLanguage('en-US');
  };

  const [imgLoading, setImgLoading] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (mainLists) return;
    dispatch(getMainListDB());
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
      threshold: 0.5,
    });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  return (
    <>
      <Container padding="0">
        <SkeletonGrid>
          <Header _onBg _content="InSplace" _search _color="#fff" />
          {/* Weather Section */}
          <>
            <MainWeather
              weatherInfo={weatherInfo}
              imgLoading={imgLoading}
              ref={imgRef}
            />
            <WeatherBox info={weatherInfo} />
            <Grid isFlex padding="96px 0  27px 21px">
              <Icon>
                <Marker />
              </Icon>
              <Text fontSize="14px" color="#fff" bold>
                {/* 현재위치 주소 */}
                {location && location.address}
              </Text>
            </Grid>
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
        </SkeletonGrid>
        {/* Place Section */}
        <Grid>
          {/* 날씨에 따른 공간 */}
          <Grid padding="0 0 48px 24px">
            {/* 임시 한국어 외국어 버튼 */}
            <Button type="type" _onClick={korean}>
              한국어
            </Button>
            <Button type="type" _onClick={american}>
              English
            </Button>
            <ContentsTitle title={t('mainPage.weatherPlace')} />
            <Swiper list={weatherList} />
          </Grid>
          {/* 좋아요 순 추천 공간 */}
          <Grid padding="0 0 48px 24px">
            <ContentsTitle title={t('mainPage.popularPlace')} />
            <Swiper list={likeList} />
          </Grid>
          {/* 관리자 추천 공간 */}
          <Grid padding="0 0 112px 24px">
            <ContentsTitle title={t('mainPage.adminPlace')} />
            <Swiper list={pickList} />
          </Grid>
        </Grid>
      </Container>
      <Navbar />
    </>
  );
};

const SkeletonGrid = styled.div`
  position: relative;
  height: 672px;
  @media (max-width: 414px) {
    height: 525px;
  }
`;

const Icon = styled.div`
  margin-right: 6px;
  svg {
    font-size: 16px;
    color: #fff;
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
  z-index: 10;
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

export default Main;
