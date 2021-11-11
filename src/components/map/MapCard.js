/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Image, Text } from '../../elements';
import { setFavoritesPostDB } from '../../redux/async/place';
import { isLoginChk } from '../../shared/utils';
import { ReactComponent as NoSelectedHeader } from '../../images/Icon/ic_heart.svg';
import { ReactComponent as SelectedHeader } from '../../images/Icon/ic_heart-filled.svg';

const MapCard = props => {
  const { el } = props;
  const dispatch = useDispatch();
  const content = useRef(null);
  const isLogin = useSelector(state => state.user.isLogin);

  const setFavorites = e => {
    e.stopPropagation();
    if (!isLoginChk(isLogin)) {
      return;
    }
    const params = {
      postId: el.postId,
      category: el.category,
      postImage: el.postImage,
      title: el.title,
      favoriteState: el.favoriteState,
    };
    dispatch(setFavoritesPostDB(params));
  };
  return (
    <MapCardCotainer ref={content}>
      <Mapchild>
        {/* 이미지 */}
        <Grid width="96px" height="96px" margin="0 20px 0 0">
          <Image width="100%" height="100%" src={el.postImage} />
        </Grid>
        {/* information */}
        <Grid width="180px">
          <Grid>
            <Text fontSize="12px" margin="0 0 2px 0">
              {el.category}
            </Text>
            <Text fontSize="13px" bold margin="0 0 40px 0">
              {el.title}
            </Text>
          </Grid>
          <Text fontSize="12px">{el.addressShort} </Text>
        </Grid>
      </Mapchild>
      <IconArea onClick={setFavorites}>
        {el && el.favoriteState ? <SelectedHeader /> : <NoSelectedHeader />}
      </IconArea>
    </MapCardCotainer>
  );
};

const AbsoluteBox = styled.div`
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  transform: translate(-50%, -50%);
`;

const MapCardCotainer = styled.div`
  width: 90%;
  background-color: transparent;
  margin: 0 auto;
  position: relative;
`;

const Mapchild = styled.div`
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
`;

const IconArea = styled.div`
  position: absolute;
  right: -2px;
  top: 6px;
  width: 24px;
  height: 24px;
  margin: 0 8px 8px 0;
  cursor: pointer;
`;

export default MapCard;
