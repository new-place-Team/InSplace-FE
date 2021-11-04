/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Text } from '../elements';
import ListCard from '../components/place/ListCard';
import Header from '../components/common/Header';
// import Navbar from '../components/common/Navbar';
import { getSearchConditionMore } from '../shared/api/placeApi';
import { history } from '../redux/configureStore';
import { getSearchConditionMoreDB } from '../redux/async/place';

const PlaceList = props => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.place.selectedCategory);
  const weatherStatus = useSelector(state => state.place.weatherStatus);
  const conditionPlacesList = useSelector(
    state => state.place.conditionPlacesMore,
  );
  console.log('conditionPlacesList == ', conditionPlacesList);
  const { type } = props.match.params;
  const [list, setList] = useState([]);
  // const [list, setList] = useState(
  //   conditionPlacesList && conditionPlacesList.posts,
  // );
  console.log('list ? ', list);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageRef = useRef();
  const Title = type === '1' ? '실내' : '실외';

  // const onLoad = async pageNumber => {
  //   console.log('pageNumber ? ', pageNumber);
  //   const params = {
  //     weather: weatherStatus.status,
  //     num: selectedCategory.MemberCnt.value,
  //     gender: selectedCategory.gender.value,
  //     inside: type,
  //     category: selectedCategory.category.value,
  //     number: pageNumber,
  //   };
  //   await dispatch(getSearchConditionMoreDB(params));

  //   setList(conditionPlacesList.posts);
  //   console.log('list 2222222222222222 ', list);
  // };
  const onLoad = async pageNumber => {
    console.log('2');
    setLoading(false);
    try {
      const params = {
        weather: weatherStatus.status,
        num: selectedCategory.MemberCnt.value,
        gender: selectedCategory.gender.value,
        inside: type,
        category: selectedCategory.category.value,
        number: pageNumber,
      };
      console.log('pageNumber === ', pageNumber);
      const res = await getSearchConditionMore(params);
      const { posts } = res.data;
      setList(prev => [...prev, ...posts]);
      console.log('list === ', list);
      setLoading(true);
    } catch (error) {
      alert('검색 결과가 없습니다.');
      history.goBack();
      console.log('error', error.response);
    }
  };

  useEffect(() => {
    console.log('1');
    onLoad(pageNumber);
  }, [pageNumber]);

  const updatePage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
    console.log('update page ', pageNumber);
  };

  useEffect(() => {
    // console.log('3');
    let observer;
    if (loading) {
      observer = new IntersectionObserver(
        entires => {
          if (entires[0].isIntersecting) {
            // 여기서 페이지 번호를 업데이트 하면, 이전 값을 참고해서
            // 콜백으로 빼줌
            updatePage();
          }
        },
        { rootMargin: `50px`, thredhold: 1.0 },
      );
      // 관찰할 대상 등록
      observer.observe(pageRef.current);
    }
    console.log('4 list == ', list);
    // return () => {
    //   observer.unobserve();
    // };
  }, [loading]);

  return (
    <>
      <Header _back _content="검색결과" _map _search />
      <Container>
        <Grid margin="24px 0">
          <Text fontSize="20px" bold>
            {Title}
          </Text>
        </Grid>
        <Grid justify="space-between" wrap>
          {!list && <Text>검색 결과가 없습니다.</Text>}
          {list &&
            list.map(info => {
              return (
                <CardWrap key={`실내-${info.postId}`}>
                  <ListCard type="searchList" info={info} />
                </CardWrap>
              );
            })}
        </Grid>
        {loading && <LodingSpiner ref={pageRef}>더보기</LodingSpiner>}
      </Container>
      {/* <Navbar /> */}
    </>
  );
};
const CardWrap = styled.div`
  width: 25%;
`;
const LodingSpiner = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  background-color: #232529;
`;
export default PlaceList;
