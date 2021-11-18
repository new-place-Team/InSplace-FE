/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import WeatherBox from '../components/main/WeatherBox';
import Header from '../components/common/Header';
import ContentsTitle from '../components/common/ContentsTitle';
import { Container, Grid, Text } from '../elements';
import { getMainListDB } from '../redux/async/place';
import Navbar from '../components/common/Navbar';
import sunBg from '../images/weather/sun_bg.jpg';
import rainBg from '../images/weather/rain_bg.jpg';
import snowBg from '../images/weather/snow_bg.jpg';
import cloudBg from '../images/weather/cloud_bg.jpg';
import { ReactComponent as Marker } from '../images/ic-marker.svg';
import { ReactComponent as Right } from '../images/ic-next.svg';
import Swiper from '../components/common/SwiperLB';
import { main } from '../images';

const Main = () => {
  const dispatch = useDispatch();
  const mainLists = useSelector(state => state.place.mainLists);
  const location = useSelector(state => state.place.location);
  const likeList = mainLists && mainLists.likePlace;
  const pickList = mainLists && mainLists.pickPlace;
  const weatherList = mainLists && mainLists.weatherPlace;
  const weatherInfo = mainLists && mainLists.weather;
  const [imgLoading, setImgLoading] = useState(false);
  const imgRef = useRef(null);
  let weatherBg = '';
  if (weatherInfo) {
    const weatherStatus = weatherInfo.frontWeather;
    if (weatherStatus === 2) {
      weatherBg = rainBg;
    } else if (weatherStatus === 3) {
      weatherBg = snowBg;
    } else if (weatherStatus === 4) {
      weatherBg = cloudBg;
    } else {
      weatherBg = sunBg;
    }
  }

  useEffect(() => {
    if (mainLists) return;
    dispatch(getMainListDB());
  }, []);

  useEffect(() => {
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('entry ? ', entry);
          setImgLoading(true);
        }
      });
    };
    const observer = new IntersectionObserver(callback, {
      threshold: 0.5,
    });
    if (imgRef.current) {
      console.log('main imgRef.current === ', imgRef.current);
      observer.observe(imgRef.current);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
      setImgLoading(false);
    };
  }, []);

  return (
    <>
      <Container padding="0">
        <SkeletonGrid>
          <Header _onBg _content="InSplace" _search _color="#fff" />
          {/* Weather Section */}
          <>
            <BackImg src={imgLoading ? weatherBg : main} ref={imgRef} />
            {/* <Bg src={imgLoading ? weatherBg : main} ref={imgRef} /> */}
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
                  장소 추천 받기
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
            <ContentsTitle title="날씨에 따른 공간" />
            <Swiper list={weatherList} />
          </Grid>
          {/* 좋아요 순 추천 공간 */}
          <Grid padding="0 0 48px 24px">
            <ContentsTitle title="좋아요를 많이 받은" />
            <Swiper list={likeList} />
          </Grid>
          {/* 관리자 추천 공간 */}
          <Grid padding="0 0 112px 24px">
            <ContentsTitle title="MD's PICK" />
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
`;
// const Bg = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   background-image: url('${props => props.src}');
//   background-size: cover;
//   z-index: -1;
// `;

const BackImg = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 672px;
  object-fit: cover;
  /* background-image: url('${props => props.src}');
  background-size: cover;
  background-position: center; */
  z-index: -1;
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
