/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Container, Grid, Text, Image } from '../elements';
import ListCard from '../components/place/ListCard';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import { getSearchConditionList } from '../shared/api/placeApi';
import { placeSearchResult } from '../images';

const PlaceList = props => {
  const url = props.location.search;
  const searchType = props.match.params.params;
  const pageRef = useRef();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const qureryString = `search/pages/${pageNumber}/${searchType}${url}`;

  let title = '';
  if (qureryString.indexOf('inside=1') !== -1) {
    title = '실내';
  } else if (qureryString.indexOf('inside=0') !== -1) {
    title = '실외';
  } else if (qureryString.indexOf('result') !== -1) {
    const findText = url.split('?result=').reverse()[0];
    title = decodeURIComponent(findText);
  }

  const onLoad = async () => {
    try {
      const res = await getSearchConditionList(qureryString);
      const { posts } = res.data;
      // 서버에서 받아온 데이터가 있을 때만 loading true로 변경되어야함
      if (posts.length !== 0) {
        setLoading(true);
      } else {
        setLoading(false);
      }
      setList(prev => [...prev, ...posts]);
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    onLoad();
  }, [pageNumber]);

  const updatePage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  // 무한 스크롤 구현
  useEffect(() => {
    const options = { rootMargin: `50px`, thredhold: 1.0 };
    const moreFun = (entires, observer) => {
      // 서버에서 받아온 데이터가 있을때만 loading 이 true되면서 아래 실행
      if (loading) {
        if (entires[0].isIntersecting) {
          // observer가 타겟을 관측하면, page의 숫자를 더해준다.
          updatePage();
          // 관찰 중지 시켜준다.
          observer.unobserve(pageRef.current);
          setLoading(false);
        }
      }
    };
    // 새로운 observer를 생성해서 타겟을 잡는다.
    if (list.length !== 0) {
      const observer = new IntersectionObserver(moreFun, options);
      if (observer) {
        observer.observe(pageRef.current);
      }
    }
    // 컴포넌트가 종료될때 observer를 해지해준다.
    return () => list.length !== 0 && observer && observer.disconnect();
  }, [loading]);

  return (
    <>
      <Header _back _content="검색결과" _map _search />
      <Container>
        {list.length === 0 ? (
          <ImageContainer>
            <Image src={placeSearchResult} />
            <Text color="#3E4042">
              <b>{title}</b> 검색 결과가 없습니다.
            </Text>
          </ImageContainer>
        ) : (
          <>
            <Text margin="40px 0 0 0" fontSize="20px" bold>
              {title}
            </Text>
            <PlaceGrid>
              {list &&
                list.map(info => {
                  return (
                    <CardWrap key={`key-${info.postId}`}>
                      <ListCard type="searchList" info={info} />
                    </CardWrap>
                  );
                })}
            </PlaceGrid>

            <Grid padding="0 0 112px 0">
              <LodingSpiner ref={pageRef}>더보기</LodingSpiner>
            </Grid>
          </>
        )}
      </Container>
      <Navbar />
    </>
  );
};

const LodingSpiner = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  background-color: #232529;
`;
const PlaceGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;
const CardWrap = styled.div`
  width: 23.5%;
  height: 290px;
  margin: 24px 0;
  margin-right: 2%;
  cursor: pointer;

  &:nth-child(4n + 0) {
    margin-right: 0px;
  }
  @media (max-width: 500px) {
    width: 48%;
    height: 290px;
  }
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  flex-direction: column;
  img {
    width: 461px;
    display: block;
  }
  @media (max-width: 500px) {
    margin-top: 20%;
    img {
      width: 100%;
    }
  }
`;
export default PlaceList;
