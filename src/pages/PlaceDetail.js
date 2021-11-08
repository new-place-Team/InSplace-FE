/* eslint-disable no-alert */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container, Grid, Text, Image, Button, Icons } from '../elements';
import { history } from '../redux/configureStore';
import Map from '../components/map/Map';
import { getPlaceDetailDB, setFavoritesPostDB } from '../redux/async/place';
import { heartFilled } from '../images/index';
import { ReactComponent as SelectedHeader } from '../images/Icon/ic_heart-filled.svg';
import { ReactComponent as NoSelectedHeader } from '../images/Icon/ic_heart_line.svg';
import { ReactComponent as Write } from '../images/Icon/ic_write.svg';
import { ReactComponent as Share } from '../images/Icon/ic_share.svg';
import { ReactComponent as PinFilled } from '../images/Icon/ic_pin-filled.svg';
import { ReactComponent as Pin } from '../images/Icon/ic_pin.svg';

import ReviewCard from '../components/place/ReviewCard';
import PlaceSwiper from '../components/place/PlaceSwiper';
import { ReactComponent as LeftIcon } from '../images/ic-left.svg';

const Detail = props => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const detailData = useSelector(state => state.place.detailInfo);
  const userInfo = useSelector(state => state.user.userInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  console.log('userInfo', userInfo);
  console.log('detailInfo', detailData);
  const newAddr = detailData.addressShort
    ? detailData.addressShort.split(' ')
    : false;

  const [active, setActive] = useState({ likeList: false, newList: true });

  const onClick = e => {
    if (e.target.name === 'likeList') {
      setActive({ ...active, likeList: true, newList: false });
    } else {
      setActive({ ...active, likeList: false, newList: true });
    }
  };
  console.log('0번째 디테일 데이터', detailData);
  const placeMarker = [
    {
      postLocationY: detailData.postLocationY,
      postLocationX: detailData.postLocationX,
    },
  ];

  console.log('첫번째 디테일 페이지 데이터', placeMarker);

  const reviewPage = () => {
    if (!isLogin) {
      window.alert('로그인을 해야 이용할 수 있는 서비스입니다');
    } else {
      history.push(`/review/write/${id}`);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  const setFavorites = () => {
    const params = {
      postId: detailData.postId,
      favoriteState: detailData.favoriteState,
    };
    dispatch(setFavoritesPostDB(params));
    console.log('setFavorites');
  };

  useEffect(() => {
    dispatch(getPlaceDetailDB(id));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container padding="0">
        <Grid>
          <PlaceSwiper list={detailData.postImages} />
          <PlaceHeader>
            <IconBox onClick={goBack}>
              <LeftIcon />
            </IconBox>
          </PlaceHeader>

          <InfoGrid>
            <Text fontSize="13px" color="#A3A6AA">
              {detailData.description}
            </Text>
            <Text fontSize="22px" bold color="#282828" lineHeight="30px">
              {detailData.title}
            </Text>
            <Grid isFlex margin="8px 0 0 0">
              <Text color="#3E4042">
                {newAddr && newAddr[0]}
                {newAddr && <GrayDotted />}
                {newAddr && newAddr[1]}
              </Text>
              <Grid isFlex margin="0 0 0 20px">
                <Image src={heartFilled} width="15px" height="16px" />
                <Text margin="0 0 0 3px" fontSize="12px" color="#3E4042">
                  {detailData.favoriteCnt}
                </Text>
              </Grid>
            </Grid>
            {/* 유저가 선택한 카테고리 */}
            <Grid margin="24px 0 0 0">
              <Button type="tag" bg="#558ED0" color="#fff">
                날씨
              </Button>
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
            {/* Icon Navigation */}
            <IconNavigation>
              <Grid>
                <Button size="12px" color="#A3A6AA">
                  <Icons margin="0 0 4px 0">
                    {detailData && detailData.visitedStatus ? (
                      <PinFilled />
                    ) : (
                      <Pin />
                    )}
                  </Icons>
                  가본곳
                </Button>
              </Grid>
              <Grid>
                <Button size="12px" color="#A3A6AA" _onClick={setFavorites}>
                  {detailData && detailData.favoriteState ? (
                    <Icons margin="0 0 4px 0">
                      <SelectedHeader />
                    </Icons>
                  ) : (
                    <Icons margin="0 0 4px 0">
                      <NoSelectedHeader />
                    </Icons>
                  )}
                  찜하기
                </Button>
              </Grid>
              <Grid>
                <Button size="12px" color="#A3A6AA" _onClick={reviewPage}>
                  <Icons>
                    <Write />
                  </Icons>
                  리뷰쓰기
                </Button>
              </Grid>
              <Grid>
                <Button size="12px" color="#A3A6AA">
                  <Icons margin="0 0 4px 0">
                    <Share />
                  </Icons>
                  공유하기
                </Button>
              </Grid>
            </IconNavigation>
            {/* 가게의 정보 */}
            <Grid>
              <Text fontSize="18px" color="#282828" bold>
                장소팁
              </Text>
              <Text fontSize="12px" margin="16px 0 32px" lineHeight="16px">
                {detailData.postDesc}
              </Text>
              <Text fontSize="18px" color="#282828" bold>
                가게정보
              </Text>
              <Grid margin="16px 0">
                {/* 카카오 지도 */}
                <Map width="100%" height="191px" allPlaces={placeMarker} />
              </Grid>
              <Text fontSize="13px" color="#3E4042">
                <Span>주소</Span>
                {detailData.address}
              </Text>
              <Text fontSize="13px" color="#3E4042">
                <Span>전화</Span>
                {detailData.contactNumber}
              </Text>
            </Grid>
          </InfoGrid>
          <ReviewWrap>
            <ReviewTitle>
              <Grid justify="space-between">
                <Grid>
                  <Text fontSize="18px" color="#282828" bold>
                    리뷰 ({detailData.reviews && detailData.reviews.length})
                  </Text>
                </Grid>
                <Grid isFlex>
                  <ReviewButton
                    className={active.newList && 'active'}
                    name="newList"
                    onClick={onClick}
                  >
                    {active.newList && <Dotted />}
                    최신순
                  </ReviewButton>
                  <ReviewButton
                    className={active.likeList && 'active'}
                    name="likeList"
                    onClick={onClick}
                  >
                    {active.likeList && <Dotted />}
                    추천순
                  </ReviewButton>
                </Grid>
              </Grid>
            </ReviewTitle>
            {/* {detailData.reviews.length === 0 && <p>등록된 리뷰가 없습니다</p>} */}
            {detailData.reviews &&
              detailData.reviews.map(item => {
                return <ReviewCard key={item.userID} {...item} />;
              })}
          </ReviewWrap>
        </Grid>
      </Container>
    </>
  );
};

const PlaceHeader = styled.div`
  position: absolute;
  width: 768px;
  height: 66px;
  line-height: 76px;
  top: 0;
  left: 0;
  z-index: 100;
`;
const IconBox = styled.div`
  display: inline-block;
  height: 100%;
  padding: 0px 24px;
  cursor: pointer;
  svg {
    fill: #fff;
  }
`;
const InfoGrid = styled.div`
  position: relative;
  top: -44px;
  left: 24px;
  z-index: 10;
  width: calc(100% - 24px);
  padding: 28px 24px 34px;
  background-color: #fff;
  box-shadow: 0px 1px 4px -12px rgba(0, 0, 0, 0.5);
`;

const IconNavigation = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
  padding: 16px 24px;
  border-top: 1px solid #e6e9ec;
  border-bottom: 1px solid #e6e9ec;
  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  margin-right: 8px;
  font-weight: 600;
  color: #282828;
`;
const ReviewTitle = styled.div`
  padding: 32px 22px 16px;
`;
const GrayDotted = styled.span`
  &:before {
    display: inline-block;
    content: '';
    width: 3px;
    height: 3px;
    margin: 0px 6px 4px;
    border-radius: 50%;
    background-color: #c4c4c4;
  }
`;
const Dotted = styled.span`
  &:before {
    display: inline-block;
    content: '';
    width: 4px;
    height: 4px;
    margin: 0px 4px 3px 0px;
    border-radius: 50%;
    background-color: #000;
  }
`;
const ReviewWrap = styled.section`
  padding-bottom: 50px;
  background-color: #fff;
`;

const ReviewButton = styled.button`
  font-size: 13px;
  font-weight: 300;
  color: #c2c6cb;
  &.active {
    color: #3e4042;
    font-weight: 600;
  }
`;

export default Detail;
