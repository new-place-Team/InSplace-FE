/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { history } from '../../redux/configureStore';
import { Grid, Image, Text } from '../../elements';
import { getCategoryText } from '../../shared/transferText';
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
        <Grid
          width="101px"
          height="121px"
          margin="0 20px 0 0"
          cursor="true"
          _onClick={() => history.push(`/place/detail/${el.postId}`)}
        >
          <Image width="100%" height="121px" src={el.postImage} />
        </Grid>
        <Grid flex>
          <Grid>
            <Text fontSize="13px" margin="0 0 2px 0">
              {el && getCategoryText(el.category)}
            </Text>
            <MapTitle
              className="mapTitle"
              fontSize="16px"
              bold
              margin="0 0 40px 0"
            >
              {el.title}
            </MapTitle>
          </Grid>
          <MapInfoText fontSize="13px">{el.addressShort}</MapInfoText>
        </Grid>
      </Mapchild>
      <IconArea onClick={setFavorites}>
        {el && el.favoriteState ? <SelectedHeader /> : <NoSelectedHeader />}
      </IconArea>
    </MapCardCotainer>
  );
};

const MapCardCotainer = styled.div`
  max-height: 162px;
`;
const Mapchild = styled.div`
  display: flex;
  justify-content: space-between;
  height: 162px;
  padding: 20px;
  background-color: #fff;
  /* overflow: hidden; */
`;
const MapInfoText = styled.p`
  padding-top: 16px;
`;
const IconArea = styled.div`
  position: absolute;
  right: 0;
  top: 12px;
  width: 28px;
  height: 28px;
  margin: 0 8px 8px 0;
  cursor: pointer;
`;
const MapTitle = styled.h3`
  margin: 0 0 40px 0;
  font-size: 16px;
  font-weight: 700;
`;
export default MapCard;
