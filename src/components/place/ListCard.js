/* eslint-disable no-undef */
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid, Image, Text } from '../../elements/index';
import { heartFilled, noImgMain } from '../../images/index';
import { getCategoryText } from '../../shared/transferText';
import { history } from '../../redux/configureStore';
import { ReactComponent as NoSelectedHeader } from '../../images/Icon/ic_heart.svg';
import { ReactComponent as SelectedHeader } from '../../images/Icon/ic_heart-filled.svg';
import { setFavoritesPostDB } from '../../redux/async/place';
import { isLoginChk } from '../../shared/utils';

const ListCard = forwardRef((props, ref) => {
  const { type, info } = props;
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsLoading(true);
        }
      });
    };
    const observer = new IntersectionObserver(callback, {
      threshold: 0.17,
    });
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer && observer.disconnect();
  }, []);

  // 각 포스트에 해당하는 id (props로 받아옴)
  const postId = info && info.postId;

  // 디테일 페이지로 이동
  const gotoDetail = () => {
    history.push(`/place/detail/${postId}`);
  };

  const setFavorites = e => {
    e.stopPropagation();
    if (!isLoginChk(isLogin)) {
      return;
    }
    const params = {
      postId,
      category: info.category,
      postImage: info.postImage,
      title: info.title,
      favoriteState: info.favoriteState,
    };
    dispatch(setFavoritesPostDB(params));
  };

  /* 이미지 ErrorHandle */
  const handleImgError = e => {
    e.target.src = noImgMain;
  };
  /* 메인 카드 */
  if (type === 'main') {
    return (
      <>
        <SkeletonBg width="237px" height="320px" ref={imgRef}>
          {isLoading && (
            <Grid _onClick={gotoDetail} width="237px" cursor="true">
              <CardImageWrap height="320px">
                <CardImage
                  width="237px"
                  src={info.postImage}
                  onError={handleImgError}
                />
              </CardImageWrap>
              <Tag>
                <Text color="#fff" fontSize="14px">
                  {info && getCategoryText(info.category)}
                </Text>
              </Tag>
              <IconArea onClick={setFavorites}>
                {info && info.favoriteState ? (
                  <SelectedHeader />
                ) : (
                  <NoSelectedHeader />
                )}
              </IconArea>
            </Grid>
          )}
        </SkeletonBg>
        <Grid margin="16px 0 0 0">
          <Text fontSize="16px" color="#272727" bold>
            {info && i18n.language === 'ko-KR' ? info.title : info.titleEn}
          </Text>
        </Grid>
        <Grid margin="6px 0 0 0" isFlex width="100%">
          <Grid width="15px" height="16px" margin="0 4px 0 0">
            <Image src={heartFilled} />
          </Grid>
          <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
            {info && info.favoriteCnt}
          </Text>
          <Text fontSize="14px" color="#646464">
            {info && i18n.language === 'ko-KR'
              ? info.addressShort
              : info.addressShortEn}
          </Text>
        </Grid>
      </>
    );
  }

  if (type === 'selectResult') {
    return (
      <>
        <SkeletonBg width="242px" height="320px" ref={imgRef}>
          {isLoading && (
            <Grid
              _onClick={() => history.push(`/place/detail/${info.postId}`)}
              cursor="true"
              width="100%"
            >
              <CardImageWrap width="242px" height="320px">
                <CardImage
                  width="242px"
                  src={info.postImage}
                  onError={handleImgError}
                />
              </CardImageWrap>
              <IconArea onClick={setFavorites}>
                {info && info.favoriteState ? (
                  <SelectedHeader />
                ) : (
                  <NoSelectedHeader />
                )}
              </IconArea>
            </Grid>
          )}
        </SkeletonBg>
        <Grid margin="11px 0 0 0">
          <Text fontSize="13px" color="#949494">
            {info && getCategoryText(info.category)}
          </Text>
        </Grid>
        <Text fontSize="16px" color="#272727" bold>
          {info.title}
        </Text>
        <Grid margin="6px 0 0 0" isFlex width="100%">
          <Grid width="15px" height="16px" margin="0 4px 0 0">
            <Image src={heartFilled} />
          </Grid>
          <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
            {info && info.favoriteCnt}
          </Text>
          <Text fontSize="14px" color="#646464">
            {info && info.addressShort}
          </Text>
        </Grid>
      </>
    );
  }

  if (type === 'searchList') {
    return (
      <>
        <GridArea ref={ref}>
          <SkeletonBg width="100%" height="196px" ref={imgRef}>
            {isLoading && (
              <Grid _onClick={gotoDetail}>
                <CardImageWrap height="196px">
                  <CardImage src={info.postImage} onError={handleImgError} />
                </CardImageWrap>
                <IconArea onClick={setFavorites}>
                  {info && info.favoriteState ? (
                    <SelectedHeader />
                  ) : (
                    <NoSelectedHeader />
                  )}
                </IconArea>
              </Grid>
            )}
          </SkeletonBg>
          <Grid margin="12px 0 0 0">
            <Text fontSize="12px" color="#A3A6AA">
              {info && getCategoryText(info.category)}
            </Text>
            <Text fontSize="14px" color="#272727" bold>
              {info && info.title}
            </Text>
          </Grid>
          <Grid margin="6px 0 0 0" isFlex>
            <Grid width="15px" height="16px" margin="0 4px 0 0">
              <Image src={heartFilled} />
            </Grid>
            <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
              {info && info.favoriteCnt}
            </Text>
            <Text fontSize="14px" color="#646464">
              {info && info.addressShort}
            </Text>
          </Grid>
        </GridArea>
      </>
    );
  }

  return (
    <>
      <SkeletonBg width="247px" height="306px" ref={imgRef}>
        {isLoading && (
          <Grid _onClick={gotoDetail} cursor="true">
            <Image width="247px" height="306px" src={info.postImage} />
          </Grid>
        )}
      </SkeletonBg>
      <Grid margin="16px 0 0 0">
        <Text fontSize="16px" color="#272727" bold>
          {info && info.title}
        </Text>
      </Grid>
      <Grid margin="6px 0 0 0" isFlex>
        <Grid width="15px" height="16px" margin="0 4px 0 0">
          <Image src={heartFilled} />
        </Grid>
        <Text fontSize="14px" color="#272727" margin="0 12px 0 0">
          {info && info.like_cnt}
        </Text>
        <Text fontSize="14px" color="#646464">
          {info && info.addressShort}
        </Text>
      </Grid>
    </>
  );
});

ListCard.defaultProps = {
  type: 'list',
  title: '상호명을 적어주세요.',
  likeCnt: 3,
  address: '강남구 · 역삼동',
  category: '카페',
};

const SkeletonBg = styled.div`
  position: relative;
  overflow: hidden;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  padding-bottom: ${props => (props.height / props.width) * 100};
  background-color: #f0f0f0;
`;

const Tag = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 8px 12px;
  background-color: #000;
`;
const IconArea = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 24px;
  height: 24px;
  margin: 0 8px 8px 0;
  cursor: pointer;
`;
const GridArea = styled.div`
  width: 100%;
  margin: 0 0 46px 0;
  @media (max-width: 500px) {
    margin: 0 0 24px 0;
  }
`;
const CardImageWrap = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin || '0'};
  z-index: 10;
`;
const CardImage = styled.img`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  object-fit: cover;
  ${props => props.margin && `margin:${props.margin}`};
  src: ${props => props.src};
  ${props => (props.color ? `color:${props.color}` : '')};
`;

export default ListCard;
