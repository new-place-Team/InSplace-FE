/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { Slick } from '../components/Slick';
import WeatherBox from '../components/WeatherBox';
import ListCard from '../components/ListCard';
import Header from '../components/Header';
import { Grid } from '../elements';
import ContentsTitle from '../components/ContentsTitle';

const Main = () => {
  const srcList = [
    {
      src: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/fyswALkE6ZUYbWU80efdqEU3-TA.JPG',
      title: '서울 길거리',
    },
    {
      src: 'https://static.hubzum.zumst.com/hubzum/2019/01/09/14/8f33083aceb34a89828fd0de21a4324d.jpg',
      title: '서울 골목',
    },
    {
      src: 'https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile29.uf.tistory.com%2Fimage%2F99BDB0425E4A505E2A5F55',
      title: '마당',
    },
    {
      src: 'https://static.hubzum.zumst.com/hubzum/2019/01/09/14/1502851fa2ef48f2a93f126ca62b5ad9.jpg',
      title: '리얼 한옥',
    },
    {
      src: 'https://static.hubzum.zumst.com/hubzum/2019/01/09/14/a0629fc25da84f258e23fe550a87fb65.jpg',
      title: '미주리 거리',
    },
  ];
  return (
    <Grid>
      <BgArea>
        <Bg />
      </BgArea>
      <Section>
        <Container>
          <Header _content="header" _search _type="search" />
          <WeatherBox />
          {/* 날씨에 따른 공간 */}
          <Grid margin="0 0 48px 0">
            <ContentsTitle title="날씨에 따른 공간" color="#fff" />
            <Slick>
              {srcList.map((info, idx) => {
                return (
                  <ListCard src={info.src} type="main" title={info.title} />
                );
              })}
            </Slick>
          </Grid>
          {/* 좋아요 순 추천 공간 */}
          <Grid margin="0 0 48px 0">
            <ContentsTitle title="좋아요를 많이 받은" />
            <Slick>
              {srcList.map((info, idx) => {
                return (
                  <ListCard src={info.src} type="main" title={info.title} />
                );
              })}
            </Slick>
          </Grid>
          {/* 관리자 추천 공간 */}
          <Grid padding="0 0 112px 0">
            <ContentsTitle title="MD's PICK" />
            <Slick>
              {srcList.map((info, idx) => {
                return (
                  <ListCard src={info.src} type="main" title={info.title} />
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
