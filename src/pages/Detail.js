/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Grid, Text } from '../elements';
import Header from '../components/Header';
import SelectedCategory from '../components/SelectedCategory';
import Map from '../components/Map';
import { getDetail } from '../shared/api/detailApi';

const Detail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  const markerdata = [
    {
      title: detailData.title,
      lat: detailData.post_loc_y,
      lng: detailData.post_loc_x,
    },
  ];
  const currentCoordinate = {
    latitude: detailData.post_loc_y,
    longitude: detailData.post_loc_x,
  };

  useEffect(async () => {
    try {
      const res = await getDetail(id);
      setDetailData(res.data.payload);
    } catch (e) {
      console.log('error ? :::::: ', e);
    }
  }, []);
  const tag = [
    { tag: '비가오는 날' },
    { tag: '혼성' },
    { tag: '카페' },
    { tag: '데이트' },
  ];

  return (
    <>
      <Grid bg="#F5F5F5">
        <EntireImage src={detailData.post_images}>
          <Header search map content="상세보기" color="#fff" />
        </EntireImage>
        {/* 상세 페이지 */}
        <InfoGrid>
          <Grid>
            <ToggleBtn>가본 곳 인가요?</ToggleBtn>
          </Grid>
          <Grid padding="24px" bg="#fff">
            <Text fontSize="13px" margin="0 0 5px 0">
              {detailData.description}
            </Text>
            <Text fontSize="22px" margin="0 0 8px 0" bold>
              {detailData.title}
            </Text>
            <Grid isFlex>
              <Text fontSize="14px" margin="0 21px 0 0" color="#646464">
                {detailData.address_short}
              </Text>
              <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
                ♥︎ {detailData.like_cnt}
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
                markerdata={markerdata}
              />
            </Grid>
            <Text fontSize="13px" margin="0 0 4px 0">
              {detailData.address}
            </Text>
            <Text fontSize="13px" margin="0 0 32px 0">
              {detailData.post_desc}
            </Text>
            <Text fontSize="18px" margin="0 0 16px 0" bold>
              영업시간
            </Text>
            <Text fontSize="13px">평일 11:30 ~ 24:00 매주</Text>
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
