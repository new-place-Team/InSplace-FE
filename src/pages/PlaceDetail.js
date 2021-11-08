/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container, Grid, Text, Image, Button, Icons } from '../elements';
import { history } from '../redux/configureStore';
import Map from '../components/map/Map';
import { getPlaceDetailDB, setFavoritesPostDB } from '../redux/async/place';
import { heartFilled, pin } from '../images/index';
import { ReactComponent as SelectedHeader } from '../images/Icon/ic_heart-filled.svg';
import { ReactComponent as NoSelectedHeader } from '../images/Icon/ic_heart_line.svg';
import { ReactComponent as Write } from '../images/Icon/ic_write.svg';
import { ReactComponent as Share } from '../images/Icon/ic_share.svg';
import PlaceSwiper from '../components/place/PlaceSwiper';
import { ReactComponent as LeftIcon } from '../images/ic-left.svg';
import ReviewList from './ReviewList';

const Detail = props => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const detailData = useSelector(state => state.place.detailInfo);
  const isLogin = useSelector(state => state.user.isLogin);

  // console.log('detailData ? ', detailData);

  const newAddr = detailData.addressShort
    ? detailData.addressShort.split(' ')
    : false;

  const placeMarker = [
    {
      postLocationY: detailData.postLocationY,
      postLocationX: detailData.postLocationX,
    },
  ];

  // console.log('첫번째 디테일 페이지 데이터', placeMarker);

  // 리뷰 쓰기 페이지로 이동
  const goReviewPage = () => {
    if (!isLogin) {
      window.alert('로그인을 해야 이용할 수 있는 서비스입니다');
      history.push('/login');
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
                  <Image src={pin} margin="0 0 1px 0" />
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
                    // <Image src={heartLine} margin="0 0 1px 0" />
                  )}
                  찜하기
                </Button>
              </Grid>
              <Grid>
                <Button size="12px" color="#A3A6AA" _onClick={goReviewPage}>
                  <Icons>
                    <Write />
                  </Icons>
                  {/* <Image src={write} margin="0 0 1px 0" /> */}
                  리뷰쓰기
                </Button>
              </Grid>
              <Grid>
                <Button size="12px" color="#A3A6AA">
                  <Icons margin="0 0 4px 0">
                    <Share />
                  </Icons>
                  {/* <Image src={share} margin="0 0 1px 0" /> */}
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
          {/* 리뷰 */}
          <ReviewList postId={id} />
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

export default Detail;
