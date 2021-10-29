/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Button, Text } from '../elements';
import Header from '../components/Header';
import SelectedCategory from '../components/SelectedCategory';
import Map from '../components/Map';

const Detail = () => {
  const tag = [
    { tag: '비가오는 날' },
    { tag: '혼성' },
    { tag: '카페' },
    { tag: '데이트' },
  ];

  const information = {
    type: '카페',
    name: '스터디카페 포레 역삼 2호점',
    address: '강남구 | 역삼동',
    detailAddress: '서울시 강남구 테헤란로 129 강남N타워 1층 (우)06133',
    phoneNumber: '02-123-4567',
    hours: '평일 11:30 ~ 24:00 매주',
  };

  const [currentCoordinate, setCurrentCoordinate] = useState({});

  const getCoordinate = pos => {
    const { latitude, longitude } = pos.coords;
    const coordinate = {
      latitude,
      longitude,
    };
    return setCurrentCoordinate(coordinate);
  };

  window.navigator.geolocation.getCurrentPosition(pos => {
    getCoordinate(pos);
  });

  return (
    <>
      <Grid bg="#F5F5F5">
        <EntireImage src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80">
          <Header search map content="상세보기" color="#fff" />
        </EntireImage>
        {/* 상세 페이지 */}
        <InfoGrid>
          <Grid>
            <ToggleBtn>가본 곳 인가요?</ToggleBtn>
          </Grid>
          <Grid padding="24px" bg="#fff">
            <Text fontSize="13px" margin="0 0 5px 0">
              {information.type}
            </Text>
            <Text fontSize="22px" margin="0 0 8px 0" bold>
              {information.name}
            </Text>
            <Grid isFlex>
              <Text fontSize="14px" margin="0 21px 0 0" color="#646464">
                {information.address}
              </Text>
              <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
                ♥︎ 1
              </Text>
            </Grid>
            <SelectedCategory tag={tag} />
            <Text fontSize="18px" margin="0 0 16px 0" bold>
              가게 정보
            </Text>
            <Grid margin="0 0 35px 0">
              <Map
                coordinate={currentCoordinate}
                width="328px"
                height="191px"
              />
            </Grid>
            <Text fontSize="13px" margin="0 0 4px 0">
              {information.detailAddress}
            </Text>
            <Text fontSize="13px" margin="0 0 32px 0">
              {information.phoneNumber}
            </Text>
            <Text fontSize="18px" margin="0 0 16px 0" bold>
              영업시간
            </Text>
            <Text fontSize="13px">{information.hours}</Text>
          </Grid>
        </InfoGrid>
      </Grid>
    </>
  );
};

const EntireImage = styled.div`
  width: 100%;
  height: 504px;
  position: relative;
  /* right: 0%;
  top: 0%; */
  background-image: url('${props => props.src}');
  background-size: cover;
  z-index: 5;
`;

const InfoGrid = styled.div`
  position: relative;
  left: 24px;
  top: -70px;
  background-color: transparent;
  z-index: 10;
  box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
`;

const ToggleBtn = styled.button`
  padding: 12px 54px;
  background-color: #838383;
  color: #fff;
`;

export default Detail;
