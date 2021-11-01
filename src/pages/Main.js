/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { Slick } from '../components/common/Slick';
import WeatherBox from '../components/main/WeatherBox';
import ListCard from '../components/place/ListCard';
import Header from '../components/common/Header';
import ContentsTitle from '../components/common/ContentsTitle';
import { Container, Grid, Button, Text } from '../elements';
import { getMainListDB } from '../redux/async/place';
import Navbar from '../components/common/Navbar';
import sunBg from '../images/weather/sun1.jpg';
import rainBg from '../images/weather/rain1.jpg';
import snowBg from '../images/weather/snow1.jpg';

const Main = () => {
  const dispatch = useDispatch();
  const mainLists = useSelector(state => state.place.mainLists);
  const likeList = mainLists.likePlace;
  const pickList = mainLists.pickPlace;
  const weatherList = mainLists.weatherPlace;
  const weatherInfo = mainLists.weather;
  let weatherBg = '';
  if (weatherInfo) {
    if (weatherInfo.status === 2) {
      weatherBg = rainBg;
    } else if (weatherInfo.status === 3) {
      weatherBg = snowBg;
    } else {
      weatherBg = sunBg;
    }
  }
  useEffect(() => {
    dispatch(getMainListDB());
  }, []);

  return (
    <Container>
      <Grid>
        <Bg src={weatherBg} />
        <Header _content="Logo" _search _type="search" />
        <WeatherBox info={weatherInfo} />
        <Button
          type="fullSizeWhite"
          bg="#fff"
          color="#000"
          margin="37px 0 50px 0"
          _onClick={() => history.push('/select/type')}
        >
          <Text fontSize="16px" bold>
            장소 추천 받기 &gt;
          </Text>
        </Button>
        {/* 날씨에 따른 공간 */}
        <Grid margin="0 0 48px 0">
          <ContentsTitle title="날씨에 따른 공간" color="#fff" />
          <Slick>
            {weatherList &&
              weatherList.map((info, idx) => {
                return (
                  <React.Fragment key={`card_${info.post_id}`}>
                    <ListCard src={info.post_images} type="main" info={info} />
                  </React.Fragment>
                );
              })}
          </Slick>
        </Grid>
        {/* 좋아요 순 추천 공간 */}
        <Grid margin="0 0 48px 0">
          <ContentsTitle title="좋아요를 많이 받은" />
          <Slick>
            {likeList &&
              likeList.map((info, idx) => {
                return (
                  <React.Fragment key={`card_${info.post_id}`}>
                    <ListCard
                      src={info.post_images}
                      type="main"
                      title={info.title}
                      info={info}
                    />
                  </React.Fragment>
                );
              })}
          </Slick>
        </Grid>
        {/* 관리자 추천 공간 */}
        <Grid padding="0 0 112px 0">
          <ContentsTitle title="MD's PICK" />
          <Slick>
            {pickList &&
              pickList.map((info, idx) => {
                return (
                  <React.Fragment key={`card_${info.post_id}`}>
                    <ListCard
                      src={info.post_images}
                      type="main"
                      title={info.title}
                      info={info}
                    />
                  </React.Fragment>
                );
              })}
          </Slick>
        </Grid>
      </Grid>
      <Navbar />
    </Container>
  );
};

const Bg = styled.div`
  width: 100%;
  height: 552px;
  position: absolute;
  top: 0;
  background-image: url('${props => props.src}');
  background-size: cover;
  z-index: -1;
  border: 2px solid black;
`;

export default Main;
