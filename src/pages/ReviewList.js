/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, Text } from '../elements';
import ReviewCard from '../components/place/ReviewCard';
import { getReviewLikesList, getReviewList } from '../shared/api/placeApi';
// import { getReviewLikesListDB, getReviewListDB } from '../redux/async/place';

const ReviewList = props => {
  const { postId } = props;
  const pageRef = useRef();
  const userInfo = useSelector(state => state.user.userInfo);
  const [active, setActive] = useState({ likeList: false, newList: true });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const reviewListLoad = async value => {
    const params = { postId, pageNumber };
    const type = value === 'list';

    try {
      const res = type
        ? await getReviewList(params)
        : await getReviewLikesList(params);
      const list = res.data.reviews;
      if (list.length !== 0) {
        setLoading(true);
        setReviews(prev => [...prev, ...list]);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 최신순 추천순 버튼
  const onClick = e => {
    if (e.target.name === 'likeList') {
      setReviews([]);
      setPageNumber(1);
      setActive({ ...active, likeList: true, newList: false });
      reviewListLoad();
    } else {
      setReviews([]);
      setPageNumber(1);
      setActive({ ...active, likeList: false, newList: true });
      reviewListLoad('list');
    }
  };

  // 원래는 리뷰 컴포넌트 분리해서,
  // 컴포넌트 안에 들어왔을때 미들웨어 호출해서 보여주려고 했었음.
  useEffect(() => {
    reviewListLoad('list');
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
          updatePage();
          observer.unobserve(pageRef.current);
        }
      }
    };

    // 새로운 observer를 생성해서 타겟을 잡는다.
    const observer = new IntersectionObserver(moreFun, options);
    if (observer) {
      observer.observe(pageRef.current);
    }

    // 컴포넌트가 종료될때 observer를 해지해준다.
    return () => reviews.length !== 0 && observer && observer.disconnect();
  }, [loading]);

  return (
    <ReviewWrap>
      <ReviewTitle>
        <Grid justify="space-between">
          <Grid>
            <Text fontSize="18px" color="#282828" bold>
              리뷰 ({reviews && reviews.length})
            </Text>
          </Grid>
          <Grid isFlex>
            <ReviewButton
              className={active.newList && 'active'}
              name="newList"
              onClick={onClick}
            >
              {active.newList && <Dotted />}
              최신순
            </ReviewButton>
            <ReviewButton
              className={active.likeList && 'active'}
              name="likeList"
              onClick={onClick}
            >
              {active.likeList && <Dotted />}
              추천순
            </ReviewButton>
          </Grid>
        </Grid>
      </ReviewTitle>
      {reviews &&
        reviews.map(item => {
          return (
            <ReviewCard
              key={item.userID}
              loginUser={userInfo.nickname}
              postId={postId}
              list={reviews}
              reviewListLoad={reviewListLoad}
              {...item}
            />
          );
        })}
      {/* {reviewsList &&
        reviewsList.map(item => {
          return (
            <ReviewCard
              key={item.userID}
              loginUser={userInfo.nickname}
              postId={reviews.postId}
              list={reviews.reviewList}
              {...item}
            />
          );
        })} */}

      <Grid padding="0 0 112px 0">
        <LodingSpiner ref={pageRef}>더보기</LodingSpiner>
      </Grid>
    </ReviewWrap>
  );
};

const ReviewWrap = styled.section`
  padding-bottom: 50px;
  background-color: #fff;
`;
const ReviewTitle = styled.div`
  padding: 32px 22px 16px;
`;
const Dotted = styled.span`
  &:before {
    display: inline-block;
    content: '';
    width: 4px;
    height: 4px;
    margin: 0px 4px 3px 0px;
    border-radius: 50%;
    background-color: #000;
  }
`;

const ReviewButton = styled.button`
  font-size: 13px;
  font-weight: 300;
  color: #c2c6cb;
  &.active {
    color: #3e4042;
    font-weight: 600;
  }
`;
const LodingSpiner = styled.div`
  width: 100%;
  padding: 20px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  background-color: #232529;
`;
export default React.memo(ReviewList);
