/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
// import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import { Container, Text, Image } from '../elements';
import Header from '../components/common/Header';
import Navbar from '../components/common/Navbar';
import ListCard from '../components/place/ListCard';
import { placeSearchResult } from '../images/index';
import { getSearchConditionListDB } from '../redux/async/place';
import SelectedCategory from '../components/place/SelectedCategory';

const PlaceList = props => {
  const dispatch = useDispatch();
  const { location, match } = props;
  const url = location.search;
  const searchType = match.params.params;
  const placeList = useSelector(state => state.place.placeList);
  const pagination = useSelector(state => state.place.placePagination);
  const { t } = useTranslation();

  /* target 을 지켜보다 target이 정해진 threshold 비율만큼 지정 행동 */
  const [target, setTarget] = useState(null);
  let title = '';
  if (url.indexOf('inside=1') !== -1) {
    // 실내
    title = t('placeList.category.0');
  } else if (url.indexOf('inside=0') !== -1) {
    // 실내
    title = t('placeList.category.1');
  } else if (url.indexOf('result') !== -1) {
    const findText = url.split('?result=').reverse()[0];
    title = decodeURIComponent(findText);
  }
  useEffect(() => {
    if (!placeList) {
      const qureryString = `search/pages/${pagination.page}/${searchType}${url}`;
      dispatch(getSearchConditionListDB(qureryString));
    }
  }, []);

  // 무한 스크롤 구현
  useEffect(() => {
    // observer 설정 값
    const options = { rootMargin: '30px', threshold: 0.5 };
    // observer 가 수행할 행동
    const moreFun = ([entires], observer) => {
      if (!entires.isIntersecting) {
        return;
      }
      const qureryString = `search/pages/${
        pagination.page + 1
      }/${searchType}${url}`;
      dispatch(getSearchConditionListDB(qureryString));
      observer.unobserve(entires.target); // 관찰 중지 시켜준다.
    };
    // 새로운 observer를 생성
    const observer = new IntersectionObserver(moreFun, options);
    if (target) observer.observe(target);
    if (!pagination.isNext) {
      observer.disconnect();
    }
    // 컴포넌트가 종료될때 observer를 해지
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      <Header
        _typeReplace={
          placeList && placeList.length > 0 && searchType !== 'condition'
        } // 검색조건 결과가 없을 경우만 searchType props를 false로
        _content={t('placeList.headerSubTitle')}
        _map
        _search
      />
      <Container>
        {searchType !== 'total' && <SelectedCategory margin="16px 0" />}
        {placeList && placeList.length <= 0 ? (
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
              {placeList &&
                placeList.map((info, idx) => {
                  const lastItem = idx === placeList.length - 1;
                  return (
                    <CardWrap key={`key-${info.postId}`}>
                      <ListCard
                        type="searchList"
                        info={info}
                        ref={lastItem ? setTarget : null}
                      />
                    </CardWrap>
                  );
                })}

              {/* <UpIcon>
                <TextGrid>
                  <BsFillArrowUpSquareFill />
                </TextGrid>
              </UpIcon> */}
            </PlaceGrid>
          </>
        )}
      </Container>
      <Navbar />
    </>
  );
};

const PlaceGrid = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 60px;
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
  flex-direction: column;
  width: 100%;
  height: 100%;
  img {
    width: 461px;
    display: block;
  }
  @media (max-width: 500px) {
    img {
      width: 100%;
    }
  }
`;

// const UpIcon = styled.div`
//   position: absolute;
//   position: fixed;
//   bottom: 100px;
//   right: 0;
//   width: 32px;
//   height: 32px;
//   z-index: 10;
//   border: 2px solid red;
//   svg {
//     width: 24px;
//     height: 24px;
//   }
// `;
export default PlaceList;
