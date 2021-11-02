/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Container, Grid, Text, Image, Button } from '../elements';
import Header from '../components/common/Header';
import SelectedCategory from '../components/place/SelectedCategory';
import Map from '../components/map/Map';
import { getPlaceDetailDB } from '../redux/async/place';
import { heartFilled, pin, write, heartLine, share } from '../images/index';

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const detailData = useSelector(state => state.place.detailInfo);
  console.log('detailData == ', detailData);
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
  useEffect(() => {
    dispatch(getPlaceDetailDB(id));
    window.scrollTo(0, 0);
  }, []);

  const tag = [
    { tag: '비가오는 날' },
    { tag: '혼성' },
    { tag: '카페' },
    { tag: '데이트' },
  ];
  return (
    <Container padding="0">
      <Grid bg="#F5F5F5">
        {/* <EntireImage src="https://i1.wp.com/osiswing.com/wp-content/uploads/2021/04/image-28.png?fit=1125%2C1374&ssl=1"> */}
        <EntireImage src={detailData.post_images}>
          <Header _type="search" _back />
        </EntireImage>
        <InfoGrid>
          <Text fontSize="13px" color="#A3A6AA">
            {detailData.description}
          </Text>
          <Text fontSize="22px" bold color="#282828" lineHeight="30px">
            {detailData.title}
          </Text>
          <Grid isFlex margin="8px 0 0 0">
            <Text color="#3E4042">{detailData.address_short}</Text>
            <Grid isFlex margin="0 0 0 20px">
              <Image src={heartFilled} width="15px" height="16px" />
              <Text margin="0 0 0 3px" fontSize="12px" color="#3E4042">
                2
              </Text>
            </Grid>
          </Grid>
          <Grid margin="24px 0 0 0">
            <Button type="tag" bg="#484C51" color="#fff">
              여자
            </Button>
            <Button type="tag" bg="#484C51" color="#fff">
              2명
            </Button>
            <Button type="tag" bg="#484C51" color="#fff">
              카페
            </Button>
          </Grid>
          <IconNavWrap>
            <Grid>
              <Image src={pin} />
              <Text fontSize="12px" color="#A3A6AA">
                가본곳
              </Text>
            </Grid>
            <Grid>
              <Image src={heartLine} />
              <Text fontSize="12px" color="#A3A6AA">
                찜하기
              </Text>
            </Grid>
            <Grid>
              <Image src={write} />
              <Text fontSize="12px" color="#A3A6AA">
                리뷰쓰기
              </Text>
            </Grid>
            <Grid>
              <Image src={share} />
              <Text fontSize="12px" color="#A3A6AA">
                공유하기
              </Text>
            </Grid>
          </IconNavWrap>
          <Grid>
            <Text fontSize="18px" color="#282828" bold>
              가게정보
            </Text>
            <Grid margin="16px 0">
              <Map
                coordinate={currentCoordinate}
                width="100%"
                height="191px"
                markerdata={markerdata}
              />
            </Grid>
            <Text fontSize="13px" color="#3E4042">
              {detailData.address}
            </Text>
            <Text fontSize="13px" color="#3E4042">
              {detailData.contact_number}
            </Text>
            <Grid margin="32px 0 0 0">
              <Text fontSize="18px" bold color="#282828">
                영업시간
              </Text>
              <Text margin="16px 0 0 0" fontSize="13px" color="#3E4042">
                평일 11:30 ~ 24:00 매주
              </Text>
            </Grid>
          </Grid>
        </InfoGrid>
      </Grid>
    </Container>
  );
};

const EntireImage = styled.div`
  position: relative;
  width: 100%;
  height: 504px;
  background-image: url('${props => props.src}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const InfoGrid = styled.div`
  position: relative;
  top: -44px;
  left: 24px;
  z-index: 10;
  width: calc(100% - 24px);
  padding: 28px 24px 34px;
  background-color: #fff;
  box-shadow: 0px 12px 24px -12px rgba(0, 0, 0, 0.5);
`;

const IconNavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
  padding: 16px 44px;
  border-top: 1px solid #e6e9ec;
  border-bottom: 1px solid #e6e9ec;
  &:hover {
    cursor: pointer;
  }
`;

export default Detail;
