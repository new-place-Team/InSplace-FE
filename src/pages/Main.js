/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';
import { Slick } from '../components/Slick';
import WeatherBox from '../components/WeatherBox';
import ListCard from '../components/ListCard';
import Header from '../components/Header';
import ContentsTitle from '../components/ContentsTitle';
import { Grid, Button, Text } from '../elements';
import { getMainListDB } from '../redux/async/place';
import Navbar from '../components/Navbar';

const Main = () => {
  const dispatch = useDispatch();
  const mainLists = useSelector(state => state.place.mainLists);
  console.log(mainLists);
  const weatherList = mainLists.weatherPlace;
  const likeList = mainLists.likePlace;
  const pickList = mainLists.pickPlace;
  const weatherInfo = mainLists.weather;
  useEffect(() => {
    dispatch(getMainListDB());
  }, []);

  return (
    <>
      <Grid>
        <BgArea>
          <Bg />
        </BgArea>
        <Section>
          <Container>
            <Header _content="Logo" _search _type="search" />
            <WeatherBox info={weatherInfo} />
            <Button
              type="fullSizeWhite"
              bg="#fff"
              color="#000"
              margin="37px 0 50px 0"
              _onClick={() => history.push('/selectedtype')}
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
          </Container>
        </Section>
      </Grid>
      <Navbar />
    </>
  );
};

const BgArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Bg = styled.div`
  width: 375px;
  height: 552px;
  position: absolute;
  top: 0;
  background-image: url('https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  z-index: -1;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 375px;
  height: 100vh;
  padding: 0 24px;
`;

export default Main;
