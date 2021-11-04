/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Text } from '../elements';
import ListCard from '../components/place/ListCard';
import Header from '../components/common/Header';
// import Navbar from '../components/common/Navbar';
import { getSearchConditionMore } from '../shared/api/placeApi';
// import { history } from '../redux/configureStore';
// import { getSearchConditionMoreDB } from '../redux/async/place';

const PlaceList = props => {
  const { type } = props.match.params;
  const selectedCategory = useSelector(state => state.place.selectedCategory);
  const weatherStatus = useSelector(state => state.place.weatherStatus);

  const [list, setList] = useState([]);

  const pageRef = useRef();
  // const [target, setTarget] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const Title = type === '1' ? '실내' : '실외';

  const updatePage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const onLoad = async pageNumber => {
    const params = {
      weather: weatherStatus.status,
      num: selectedCategory.MemberCnt.value,
      gender: selectedCategory.gender.value,
      inside: type,
      category: selectedCategory.category.value,
      number: pageNumber,
    };
    console.log('params == ', params);
    try {
      const res = await getSearchConditionMore(params);
      const { posts } = res.data;
      setLoading(true);
      console.log('posts', posts);
      // setList(posts);
      setList(prev => [...prev, ...posts]);
      console.log('pageNumber == ', pageNumber);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    onLoad(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const options = { rootMargin: `50px`, thredhold: 1.0 };
    const moreFun = (entires, observer) => {
      if (loading) {
        if (entires[0].isIntersecting) {
          updatePage();
          observer.unobserve(pageRef.current);
          setLoading(false);
        }
      }
    };

    const observer = new IntersectionObserver(moreFun, options);
    if (observer) {
      observer.observe(pageRef.current);
    }
    return () => observer && observer.disconnect();
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
          {/* {!list && <Text>검색 결과가 없습니다.</Text>} */}
          {list &&
            list.map(info => {
              return (
                <CardWrap key={`sidetes-${info.postId}`}>
                  <ListCard type="searchList" info={info} />
                </CardWrap>
              );
            })}
        </Grid>
        <LodingSpiner ref={pageRef}>더보기</LodingSpiner>
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
