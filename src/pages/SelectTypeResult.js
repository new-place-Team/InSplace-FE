/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Grid, Image } from '../elements';
import Swiper from '../components/common/SwiperLB';
import ContentsTitle from '../components/common/ContentsTitle';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { getSearchConditionDB } from '../redux/async/place';
import SelectedCategory from '../components/place/SelectedCategory';
import right from '../images/ic-right.svg';
import { history } from '../redux/configureStore';
import { setPlaceListInit } from '../redux/modules/placeSlice';
import Spinner from '../components/common/Spinner';

const SearchTypeList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.loaded.is_loaded);
  const conditionPlaces = useSelector(state => state.place.conditionPlaces);
  const categoryParams = useSelector(state => state.place.categoryParams);
  const inSideList = conditionPlaces && conditionPlaces.insidePlaces;
  const outSideList = conditionPlaces && conditionPlaces.outSidePlaces;
  const { t } = useTranslation();

  useEffect(() => {
    if (!conditionPlaces) {
      const params = history.location.search;
      dispatch(getSearchConditionDB(params));
    }
  }, []);

  const onSearchConditionMore = value => {
    const params = `condition${categoryParams}&inside=${value}`;
    dispatch(setPlaceListInit());
    history.push(`/place/list/${params}`);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <Header
        _type="search"
        _back
        _content={t('selectTypeResultPage.headerSubTitle')}
        _map
        _search
        _color="#000"
      />
      <Container height="auto">
        <SelectedCategory />
        {/* 실내 리스트 */}
        <Grid isFlex>
          <ContentsTitle
            title={
              inSideList && inSideList.length === 0
                ? t('selectTypeResultPage.inSideResult.0')
                : t('selectTypeResultPage.inSideResult.1')
            }
          />
          {inSideList && inSideList.length !== 0 && (
            <Button _onClick={() => onSearchConditionMore(1)}>
              <Image
                margin="0 0 0 5px"
                width="24px"
                height="24px"
                src={right}
              />
            </Button>
          )}
        </Grid>
      </Container>
      <Container padding="0 0 0 24px">
        <Grid>
          <Swiper list={inSideList} type="selectResult" />
        </Grid>
        {/* 실외 리스트  */}
        <Grid margin="28px 0 0 0" padding="0 0 100px 0">
          <Grid isFlex>
            <ContentsTitle
              title={
                outSideList && outSideList.length === 0
                  ? t('selectTypeResultPage.outSideResult.0')
                  : t('selectTypeResultPage.outSideResult.1')
              }
            />
            {outSideList && outSideList.length !== 0 && (
              <Button _onClick={() => onSearchConditionMore(0)}>
                <Image
                  margin="0 0 0 5px"
                  width="24px"
                  height="24px"
                  src={right}
                />
              </Button>
            )}
          </Grid>
          <Swiper list={outSideList} type="selectResult" />
        </Grid>
      </Container>
      <Navbar />
    </>
  );
};

export default SearchTypeList;
