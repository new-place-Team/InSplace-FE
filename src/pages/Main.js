/* eslint-disable import/no-unresolved */
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
import { ReactComponent as Marker } from '../images/ic-marker.svg';

const Main = () => {
  const dispatch = useDispatch();
  const mainLists = useSelector(state => state.place.mainLists);
  const likeList = mainLists && mainLists.likePlace;
  const pickList = mainLists && mainLists.pickPlace;
  const weatherList = mainLists && mainLists.weatherPlace;
  const weatherInfo = mainLists && mainLists.weather;
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
    if (mainLists) return;
    dispatch(getMainListDB());
  }, []);

  return (
    <>
      <Header _content="Logo" _search />
      <Container padding="66px 0 0 0">
        <Grid>
          <Bg src={weatherBg} />
          <WeatherBox info={weatherInfo} />
          <Grid isFlex padding="96px 0  27px 21px">
            <Icon>
              <Marker />
            </Icon>
            <Text fontSize="14px" color="#fff" bold>
              서울시 마포구 상암동
            </Text>
          </Grid>
          {/* 장소 추천받기 */}
          {/* <Button
            type="fullSizeWhite"
            bg="#fff"
            color="#000"
            margin="37px 0 50px 0"
            _onClick={() => history.push('/select/type')}
          >
            <Text fontSize="16px" bold>
              장소 추천 받기 &gt;
            </Text>
          </Button> */}
        </Grid>
        <Grid>
          {/* 날씨에 따른 공간 */}
          <Grid margin="0 0 48px 24px">
            <ContentsTitle title="날씨에 따른 공간" />
            <Slick>
              {weatherList &&
                weatherList.map(info => {
                  return (
                    <React.Fragment key={`card_${info.post_id}`}>
                      <ListCard
                        src={info.post_images}
                        type="main"
                        info={info}
                      />
                    </React.Fragment>
                  );
                })}
            </Slick>
          </Grid>
          {/* 좋아요 순 추천 공간 */}
          <Grid margin="0 0 48px 24px">
            <ContentsTitle title="좋아요를 많이 받은" />
            <Slick>
              {likeList &&
                likeList.map(info => {
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
          <Grid padding="0 0 112px 24px">
            <ContentsTitle title="MD's PICK" />
            <Slick>
              {pickList &&
                pickList.map(info => {
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
      </Container>
      <Navbar />
    </>
  );
};

const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-image: url('${props => props.src}');
  background-size: cover;
  z-index: -1;
`;

const Icon = styled.div`
  margin-right: 6px;
  svg {
    font-size: 16px;
    color: #fff;
  }
`;

export default Main;
