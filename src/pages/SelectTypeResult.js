/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Grid, Image } from '../elements';
import Swiper from '../components/common/SwiperLB';
import ContentsTitle from '../components/common/ContentsTitle';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { getSearchConditionDB } from '../redux/async/place';
import SelectedCategory from '../components/place/SelectedCategory';
import { right } from '../images/index';
import { history } from '../redux/configureStore';

const SearchTypeList = props => {
  const dispatch = useDispatch();
  const conditionPlaces = useSelector(state => state.place.conditionPlaces);
  const selectedCategory = useSelector(state => state.place.selectedCategory);
  const weatherStatus = useSelector(state => state.place.weatherStatus);
  const inSideList = conditionPlaces && conditionPlaces.insidePlaces;
  const outSideList = conditionPlaces && conditionPlaces.outSidePlaces;

  useEffect(() => {
    // 유저가 선택한 유형 결과에서 새로고침 했을 경우를 대비
    const newParams = props.history.location.state.weatherStatus;
    if (!conditionPlaces) {
      dispatch(getSearchConditionDB(newParams));
    }
  }, []);

  const onSearchConditionMore = value => {
    const params = `condition?weather=${weatherStatus.status}&category=${selectedCategory.category.value}&num=${selectedCategory.MemberCnt.value}&gender=${selectedCategory.gender.value}&inside=${value}`;
    history.push(`/place/list/${params}`);
  };

  return (
    <>
      <Header _type="search" _back _content="검색 결과" _map _search />
      <Container>
        <SelectedCategory tag={selectedCategory} />
        {/* 실내 리스트 */}
        <Grid isFlex>
          <ContentsTitle title="실내" />
          <Button _onClick={() => onSearchConditionMore(1)}>
            <Image margin="0 0 0 5px" width="24px" height="24px" src={right} />
          </Button>
        </Grid>
        <Grid>
          <Swiper list={inSideList} type="selectResult" />
        </Grid>
        {/* 실외 리스트  */}
        <Grid margin="28px 0 0 0" padding="0 0 100px 0">
          <Grid isFlex>
            <ContentsTitle title="실외에서 시원한 바람과 함께" />
            <Button _onClick={() => onSearchConditionMore(0)}>
              <Image
                margin="0 0 0 5px"
                width="24px"
                height="24px"
                src={right}
              />
            </Button>
          </Grid>
          <Swiper list={outSideList} type="selectResult" />
        </Grid>
      </Container>
      <Navbar />
    </>
  );
};

export default SearchTypeList;
