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
import { right } from '../images/index';

const SearchTypeList = history => {
  const dispatch = useDispatch();
  const conditionPlaces = useSelector(state => state.place.conditionPlaces);
  console.log('>>>>', conditionPlaces);
  const inSideList = conditionPlaces && conditionPlaces.insidePlaces;
  const outSideList = conditionPlaces && conditionPlaces.outSidePlaces;

  useEffect(() => {
    // 유저가 선택한 유형 결과에서 새로고침 했을 경우를 대비
    const params = history.location.state.weatherStatus;
    if (!conditionPlaces) {
      dispatch(getSearchConditionDB(params));
    }
  }, []);

  return (
    <>
      <Header _type="search" _back _content="검색 결과" _map _search />
      <Container>
        {/* 실내 리스트 */}
        <Grid isFlex>
          <ContentsTitle title="실내" />
          <Button _onClick={() => console.log('click')}>
            <Image margin="0 0 0 5px" width="24px" height="24px" src={right} />
          </Button>
        </Grid>
        <Grid>
          <Swiper list={inSideList} type="selectResult" />
        </Grid>
        {/* 실외 리스트  */}
        <Grid margin="0" padding="0 0 100px 0">
          <Grid isFlex>
            <ContentsTitle title="실외에서 시원한 바람과 함께" />
            <Button _onClick={() => console.log('click')}>
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
