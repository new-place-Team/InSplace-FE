/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container, Grid, Text, Image, Button, Icons } from '../elements';
import { history } from '../redux/configureStore';
import Map from '../components/map/Map';
import {
  getPlaceDetailDB,
  setFavoritesPostDB,
  setVisitedPostDB,
} from '../redux/async/place';

import { heartFilled } from '../images/index';
import { ReactComponent as SelectedHeader } from '../images/Icon/ic_heart-filled.svg';
import { ReactComponent as NoSelectedHeader } from '../images/Icon/ic_heart_line.svg';
import { ReactComponent as Write } from '../images/Icon/ic_write.svg';
import { ReactComponent as Share } from '../images/Icon/ic_share.svg';
import { ReactComponent as PinFilled } from '../images/Icon/ic_pin-filled.svg';
import { ReactComponent as Pin } from '../images/Icon/ic_pin.svg';

import PlaceSwiper from '../components/place/PlaceSwiper';
import { ReactComponent as LeftIcon } from '../images/ic-left.svg';

import ReviewList from './ReviewList';
import { getCategoryText } from '../shared/transferText';
import ConfirmModal from '../components/common/ConfirmModal';

const Detail = props => {
  const dispatch = useDispatch();
  const { match } = props;
  const { id } = match.params;
  const detailData = useSelector(state => state.place.detailInfo);
  const isLogin = useSelector(state => state.user.isLogin);
  const [confirmModal, setConfirmModal] = useState(false);
  const { t } = useTranslation();

  const newAddr = detailData ? detailData.addressShort.split(' ') : false;
  const placeMarker = detailData
    ? [
        {
          postLocationY: detailData.postLocationY,
          postLocationX: detailData.postLocationX,
        },
      ]
    : null;

  useEffect(() => {
    dispatch(getPlaceDetailDB(id));
    window.scrollTo(0, 0);
    if (!Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_MAP_KEY);
    }
  }, []);

  // 리뷰 쓰기 페이지로 이동
  const goReviewPage = () => {
    if (!isLogin) {
      setConfirmModal(true);
      return;
    }
    history.push(`/review/write/${id}`);
  };

  const goBack = () => {
    if (history.length <= 2) {
      history.goBack('/');
    }
    history.goBack();
  };

  /* postInfo parameter */
  const getParams = () => {
    const params = {
      postId: detailData.postId,
      categoryId: detailData.categoryId,
      postImage: detailData.postImages[0],
      title: detailData.title,
    };
    return params;
  };

  /* 좋아요 추가 및 삭제 */
  const setFavorites = () => {
    if (!isLogin) {
      setConfirmModal(true);
      return;
    }
    const defaultParams = getParams();
    const params = {
      ...defaultParams,
      favoriteState: detailData.favoriteState,
    };
    dispatch(setFavoritesPostDB(params));
  };
  /* 가본장소 추가 및 삭제 */
  const setVisited = () => {
    if (!isLogin) {
      setConfirmModal(true);
      return;
    }
    const defaultParams = getParams();
    const params = {
      ...defaultParams,
      visitedStatus: detailData.visitedStatus,
    };
    dispatch(setVisitedPostDB(params));
  };

  /* 카카오 공유하기 */
  const shareKakao = () => {
    // eslint-disable-next-line no-undef
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: detailData.title,
        description: detailData.postDesc,
        imageUrl: detailData.postImages[0],
        link: {
          mobileWebUrl: `https://insplace.co.kr${history.location.pathname}`,
          webUrl: `https://insplace.co.kr${history.location.pathname}`,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: `https://insplace.co.kr${history.location.pathname}`,
            webUrl: `https://insplace.co.kr${history.location.pathname}`,
          },
        },
      ],
      // 카카오톡 미설치 시 카카오톡 설치 경로이동
      installTalk: true,
    });
  };

  return (
    <>
      {confirmModal && (
        <ConfirmModal
          title={t('Navbar.login')}
          setConfirmModal={setConfirmModal}
          goToLogin
        />
      )}
      <Container padding="0">
        <Grid bg="#F5F5F5">
          <PlaceSwiper list={detailData && detailData.postImages} />
          <PlaceHeader>
            <IconBox>
              <LeftIcon onClick={goBack} />
            </IconBox>
          </PlaceHeader>
          <InfoGrid>
            <Text fontSize="13px" color="#A3A6AA">
              {getCategoryText(detailData && detailData.categoryId)}
            </Text>
            <Text fontSize="22px" bold color="#282828" lineHeight="30px">
              {detailData && detailData.title}
            </Text>
            <Grid isFlex margin="8px 0 0 0">
              <Text color="#3E4042" fontSize="14px">
                {newAddr && newAddr[0]}
                {newAddr && <GrayDotted />}
                {newAddr && newAddr[1]}
              </Text>
              <Grid isFlex margin="0 0 0 20px">
                <Image src={heartFilled} width="15px" height="16px" />
                <Text margin="0 0 0 3px" fontSize="12px" color="#3E4042">
                  {detailData && detailData.favoriteCnt}
                </Text>
              </Grid>
            </Grid>
            {/* 유저가 선택한 카테고리 2021-11-21 주석 */}
            {/* <Grid margin="24px 0 0 0">
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
            </Grid> */}
            {/* Icon Navigation */}
            <IconNavigation>
              <Grid>
                <Button size="12px" color="#A3A6AA" _onClick={setVisited}>
                  <Icons margin="0 0 4px 0" color="#282828">
                    {detailData && detailData && detailData.visitedStatus ? (
                      <PinFilled />
                    ) : (
                      <Pin />
                    )}
                  </Icons>
                  {t('placeDetailPage.navigation.0')}
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
                  {t('placeDetailPage.navigation.1')}
                </Button>
              </Grid>
              <Grid>
                <Button size="12px" color="#A3A6AA" _onClick={goReviewPage}>
                  <Icons>
                    <Write />
                  </Icons>
                  {t('placeDetailPage.navigation.2')}
                </Button>
              </Grid>
              <Grid>
                <Button size="12px" color="#A3A6AA" _onClick={shareKakao}>
                  <Icons margin="0 0 4px 0">
                    <Share />
                  </Icons>
                  {t('placeDetailPage.navigation.3')}
                </Button>
              </Grid>
            </IconNavigation>
            {/* 가게의 정보 */}
            <Grid>
              <Text fontSize="18px" color="#282828" bold>
                {t('placeDetailPage.category.0')}
              </Text>
              <Text fontSize="14px" margin="16px 0 32px" lineHeight="16px">
                {detailData && detailData.postDesc}
              </Text>
              <Text fontSize="18px" color="#282828" bold>
                {t('placeDetailPage.category.1')}
              </Text>
              <Grid margin="16px 0">
                {/* 카카오 지도 */}
                <Map
                  width="100%"
                  height="191px"
                  allPlaces={placeMarker}
                  type="detail"
                />
              </Grid>
              <Text fontSize="14px" color="#3E4042">
                <Span>{t('placeDetailPage.category.2')}</Span>
                {detailData && detailData.address}
              </Text>
              <Text fontSize="14px" color="#3E4042">
                <Span>{t('placeDetailPage.category.3')}</Span>
                {detailData && detailData.contactNumber}
              </Text>
            </Grid>
          </InfoGrid>
          <ReviewList postId={id} />
        </Grid>
      </Container>
    </>
  );
};

const PlaceHeader = styled.div`
  position: absolute;
  width: 100%;
  height: 66px;
  line-height: 76px;
  top: 0;
  left: 0;
  z-index: 8;
`;
const IconBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  z-index: 8;
  width: calc(100% - 24px);
  padding: 28px 24px 34px;
  background-color: #fff;
  box-shadow: 0px 1px 4px -12px rgba(0, 0, 0, 0.5);
  overflow-x: hidden;
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
