import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { Container, Grid, Text, Image, Icons } from '../elements';
import { ReactComponent as SelectedHeart } from '../images/Icon/ic_heart-dark.svg';
import { ReactComponent as PinFilled } from '../images/Icon/ic_pin-filled.svg';
import { getCategoryText } from '../shared/transferText';
import { noLikePlace, noVisitedPlace } from '../images/index';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { getFavoritesDB, getVisitedDB } from '../redux/async/user';
import Spinner from '../components/common/Spinner';

const Pick = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userPickPlaces = useSelector(state => state.user.userPickPlaces);
  const isLoading = useSelector(state => state.loaded.is_loaded);
  const [isLikeSelected, setIsLikeSelected] = useState(true);
  // console.log('userPickPlaces', userPickPlaces);
  useEffect(() => {
    if (!userPickPlaces.likeList) {
      dispatch(getFavoritesDB());
    }
    window.scrollTo(0, 0);
  }, []);

  const toggleSelected = type => {
    /* 좋아요, 가본곳 Toggle */
    setIsLikeSelected(type);
    if (!type && !userPickPlaces.visitedList) {
      dispatch(getVisitedDB());
    }
  };

  return (
    <>
      <Header _content={t('Pick.headerSubTitle')} _language />
      <Container padding="66px 0 0 0">
        <PickPlace>
          <Grid
            width="100%"
            isFlex
            justify="center"
            borderBottom={
              isLikeSelected ? '2px solid #000' : '1px solid #A4A9B1'
            }
            _onClick={() => toggleSelected(true)}
            cursor
          >
            <Icons
              margin="0 8px 0 0"
              color={isLikeSelected ? '#282828' : '#A3A6AA'}
            >
              <SelectedHeart />
            </Icons>
            <Text
              fontSize="16px"
              color={isLikeSelected ? '#282828' : '#A3A6AA'}
            >
              {t('Pick.pickPlace')}
            </Text>
          </Grid>
          <Grid
            width="100%"
            isFlex
            justify="center"
            borderBottom={
              isLikeSelected ? '1px solid #A4A9B1' : '2px solid #000'
            }
            _onClick={() => toggleSelected(false)}
            cursor
          >
            <Icons
              margin="0 8px 0 0"
              color={isLikeSelected ? '#A3A6AA' : '#282828'}
            >
              <PinFilled />
            </Icons>
            {/* <Image src={pin} width="24px" height="24px" margin="0 8px 1px 0" /> */}
            <Text
              fontSize="16px"
              color={isLikeSelected ? '#A3A6AA' : '#282828'}
            >
              {t('Pick.visitedPlace')}
            </Text>
          </Grid>
        </PickPlace>
        {isLikeSelected ? (
          /* 좋아요 리스트 */
          <>
            {isLoading && <Spinner />}
            {userPickPlaces.likeList && userPickPlaces.likeList.length > 0 ? (
              <Grid width="100%" isFlex wrap padding="0 0 65px  0">
                {userPickPlaces.likeList.map(item => {
                  return (
                    <Image
                      key={item.postId}
                      padding="0 0 50% 0"
                      type="bg"
                      width="50%"
                      src={item.postImage}
                      _onClick={() =>
                        history.push(`/place/detail/${item.postId}`)
                      }
                    >
                      <AbsoluteBox bottom="10px" left="10px">
                        <Text color="#fff" fontSize="12px">
                          {getCategoryText(item.categoryId)}
                        </Text>
                        <Text color="#fff" fontSize="14px" bold>
                          {item.title}
                        </Text>
                      </AbsoluteBox>
                    </Image>
                  );
                })}
              </Grid>
            ) : (
              <>
                {isLoading && <Spinner />}
                <Grid
                  width="100%"
                  height="80%"
                  isFlex
                  wrap
                  padding="0 0 65px  0"
                >
                  <IsNoneArea>
                    <Image src={noLikePlace} />
                    <Text margin="69px 0 0 0">{t('Pick.noPickPlace')}</Text>
                  </IsNoneArea>
                </Grid>
              </>
            )}
          </>
        ) : (
          /* 가본곳 리스트 */
          <Grid
            width="100%"
            height={
              userPickPlaces.visitedList &&
              userPickPlaces.visitedList.length > 0
                ? ''
                : '80%'
            }
            isFlex
            wrap
            padding="0 0 65px  0"
          >
            {userPickPlaces.visitedList &&
            userPickPlaces.visitedList.length > 0 ? (
              userPickPlaces.visitedList.map(item => {
                return (
                  <Image
                    key={item.postId}
                    padding="0 0 50% 0"
                    type="bg"
                    width="50%"
                    src={item.postImage}
                    _onClick={() =>
                      history.push(`/place/detail/${item.postId}`)
                    }
                  >
                    <AbsoluteBox bottom="10px" left="10px">
                      <Text color="#fff" fontSize="12px">
                        {getCategoryText(item.categoryId)}
                      </Text>
                      <Text color="#fff" fontSize="14px" bold>
                        {item.title}
                      </Text>
                    </AbsoluteBox>
                  </Image>
                );
              })
            ) : (
              <IsNoneArea>
                <Image src={noVisitedPlace} />
                <Text margin="69px 0 0 0">{t('Pick.noVisitedPlace')}</Text>
              </IsNoneArea>
            )}
          </Grid>
        )}
      </Container>
      <Navbar />
    </>
  );
};

const PickPlace = styled.div`
  max-width: 768px;
  height: 66px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const AbsoluteBox = styled.div`
  position: absolute;
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  /* transform: translate(-50%, -50%); */
`;

const IsNoneArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Pick;
