/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid } from '../elements';
import { Slick } from '../components/common/Slick';
import ListCard from '../components/place/ListCard';
import ContentsTitle from '../components/common/ContentsTitle';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { getSearchConditionDB } from '../redux/async/place';

const SearchTypeList = history => {
  const conditionPlaces = useSelector(state => state.place.conditionPlaces);
  const dispatch = useDispatch();
  const inSideList = conditionPlaces && conditionPlaces.insidePlaces;
  const outSideList = conditionPlaces && conditionPlaces.outSidePlaces;
  // list에 image가 1개만 내려올 경우, slick 컴포넌트 분기처리를 위한 변수 설정
  const inSideLength = inSideList && inSideList.length === 1;
  const outSideLength = outSideList && outSideList.length === 1;

  useEffect(() => {
    // 유저가 선택한 유형 결과에서 새로고침 했을 경우를 대비
    const params = history.location.state;
    if (inSideList === undefined && outSideList === undefined) {
      dispatch(getSearchConditionDB(params));
    }
  }, []);

  return (
    <>
      <Header _type="search" _back _content="검색 결과" _map _search />
      <Container>
        {/* <SelectedCategory tag={selected[0]} /> */}
        <ContentsTitle title="실내" />
        <Grid>
          <Slick inSideLength={inSideLength}>
            {inSideList &&
              inSideList.map(info => {
                return <ListCard info={info} />;
              })}
          </Slick>
        </Grid>

        <Grid margin="0">
          <ContentsTitle title="실외에서 시원한 바람과 함께" />
          <Slick outSideLength={outSideLength}>
            {outSideList &&
              outSideList.map(info => {
                return <ListCard info={info} />;
              })}
          </Slick>
        </Grid>
      </Container>
      <Navbar />
    </>
  );
};

export default SearchTypeList;
