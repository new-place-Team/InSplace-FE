/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Image, Text } from '../../elements/index';
import { heartFilled } from '../../images/index';
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

  /* 메인 카드 */
  if (type === 'main') {
    return (
      <>
        <Grid _onClick={gotoDetail} width="237px" cursor>
          <Image width="237px" height="320px" src={info && info.postImage} />
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
        <Grid margin="16px 0 0 0">
          <Text fontSize="16px" color="#272727" bold>
            {info && info.title}
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
            {info && info.addressShort}
          </Text>
        </Grid>
      </>
    );
  }

  if (type === 'selectResult') {
    return (
      <>
        <Grid
          _onClick={() => history.push(`/place/detail/${info.postId}`)}
          cursor
          width="237px"
        >
          <Image width="237px" height="320px" src={info && info.postImage} />
          <IconArea onClick={setFavorites}>
            {info && info.favoriteState ? (
              <SelectedHeader />
            ) : (
              <NoSelectedHeader />
            )}
          </IconArea>
        </Grid>
        <Grid margin="11px 0 0 0">
          <Text fontSize="13px" color="#949494">
            {info.category}
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
      <GridArea ref={ref}>
        <Grid _onClick={gotoDetail}>
          <Image width="100%" height="196px" src={info && info.postImage} />
          <IconArea onClick={setFavorites}>
            {info && info.favoriteState ? (
              <SelectedHeader />
            ) : (
              <NoSelectedHeader />
            )}
          </IconArea>
        </Grid>
        <Grid margin="12px 0 0 0">
          <Text fontSize="12px" color="#A3A6AA">
            카테고리
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
    );
  }

  return (
    <>
      <Grid _onClick={gotoDetail} cursor>
        <Image width="247px" height="306px" src={info && info.postImage} />
      </Grid>
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
`;
export default ListCard;
