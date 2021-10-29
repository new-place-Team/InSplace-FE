/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Slick } from '../components/Slick';
import WeatherBox from '../components/WeatherBox';
import ListCard from '../components/ListCard';
import Header from '../components/Header';
import { Grid } from '../elements';
import ContentsTitle from '../components/ContentsTitle';
import { getMainListDB } from '../redux/async/place';

const Main = () => {
  const dispatch = useDispatch();
  const mainLists = useSelector(state => state.place.mainLists);
  const weatherList = mainLists.weatherPlace;
  const likeList = mainLists.likePlace;
  const pickList = mainLists.pickPlace;

  useEffect(() => {
    console.log('mainLists', mainLists);
    dispatch(getMainListDB());
  }, []);

  return (
    <Grid>
      <BgArea>
        <Bg />
      </BgArea>
      <Section>
        <Container>
          <Header _content="Logo" _search _type="search" />
          <WeatherBox />
          {/* 날씨에 따른 공간 */}
          <Grid margin="0 0 48px 0">
            <ContentsTitle title="날씨에 따른 공간" color="#fff" />
            <Slick>
              {weatherList &&
                weatherList.map((info, idx) => {
                  return (
                    <ListCard
                      src={info.post_images}
                      type="main"
                      title={info.title}
                      info={info}
                    />
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
                    <ListCard
                      src={info.post_images}
                      type="main"
                      title={info.title}
                      info={info}
                    />
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
                    <ListCard
                      src={info.post_images}
                      type="main"
                      title={info.title}
                      info={info}
                    />
                  );
                })}
            </Slick>
          </Grid>
        </Container>
      </Section>
    </Grid>
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
